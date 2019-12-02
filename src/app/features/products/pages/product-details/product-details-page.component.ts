import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import {
	SupplierRequestDialogComponent,
} from '~common/dialogs/custom-dialogs/supplier-request-dialog/supplier-request-dialog.component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ProductFeatureService } from '~features/products/services';
import { ERM, Product, Project, Sample, Task, Supplier } from '~models';
import { CloseEvent, CloseEventType, DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { NotificationService, NotificationType } from '~shared/notifications';
import { RatingService } from '~shared/rating/services/rating.service';
import { AutoUnsub, log } from '~utils';

/**
 *
 * My old aunts would come and tease me at weddings, “Well Sarah? Do you think you’ll be next?”
 *  -
 * We’ve settled this quickly once I’ve started doing the same to them at funerals.
 *
 */

@Component({
	selector: 'product-details-page-app',
	templateUrl: './product-details-page.component.html',
	styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent extends AutoUnsub implements OnInit {
	@Input() requestCount: number;
	@ViewChild('main', { read: ElementRef, static: false }) main: ElementRef;
	@ViewChild('rating', { read: ElementRef, static: false }) rating: ElementRef;

	product: Product;
	product$: Observable<Product>;

	/** projects for this product */
	typeEntity = ERM.PRODUCT;
	tabs: { name: string, number$?: Observable<number> }[];
	// sample & task used for the preview
	sample: Sample;
	task: Task;
	previewOpened = false;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private featureSrv: ProductFeatureService,
		private dlgSrv: DialogService,
		private notifSrv: NotificationService,
		private ratingSrv: RatingService,
		public dlgCommonSrv: DialogCommonService,
		private translate: TranslateService
	) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.params.pipe(
			map(params => params.id),
			takeUntil(this._destroy$)
		);

		this.product$ = id$.pipe(
			switchMap(id => this.featureSrv.selectOne(id)),
			takeUntil(this._destroy$)
		);

		this.product$.pipe(
			takeUntil(this._destroy$)
		).subscribe(
			product => this.onProduct(product),
			err => this.onError(err)
		);

	}

	private onProduct(product) {
		if (!product) {
			this.notifSrv.add({
				type: NotificationType.ERROR,
				title: this.translate.instant('title.product-not-exist'),
				timeout: 3500
			});
			this.router.navigate(['products']);
		} else {
			this.product = product;
		}
	}

	private onError(error) {
		log.error(error);
		this.notifSrv.add({
			type: NotificationType.ERROR,
			title: this.translate.instant('title.error'),
			message: this.translate.instant('error.there-is-an-error'),
			timeout: 3500
		});
		this.router.navigate(['products']);
	}

	onArchive(product: Product | Product[]) {
		if (Array.isArray(product)) {
			this.featureSrv.updateMany(product.map((p: Product) => ({ id: p.id, archived: true })))
				.subscribe(_ => {
					this.notifSrv.add({
						type: NotificationType.SUCCESS,
						title: this.translate.instant('title.products-archived'),
						message: this.translate.instant('message.products-archived-successfully')
					});
				});
		} else {
			const { id } = product;
			this.featureSrv.update({ id, archived: true })
				.subscribe(_ => {
					this.notifSrv.add({
						type: NotificationType.SUCCESS,
						title: this.translate.instant('title.product-archived'),
						message: this.translate.instant('message.product-archived-successfully')
					});
				});
		}
	}

	/** item status update */
	updateStatus(statusId: string) {
		this.featureSrv
			.update({ id: this.product.id, status: { id: statusId } })
			.subscribe();
	}

	/** item has been favorited */
	onFavorited() {
		this.featureSrv
			.update({ id: this.product.id, favorite: true })
			.subscribe();
	}

	/** item has been unfavorited */
	onUnfavorited() {
		this.featureSrv
			.update({ id: this.product.id, favorite: false })
			.subscribe();
	}

	onThumbUp() {
		const votes = this.ratingSrv.thumbUp(this.product);
		this.updateProduct({ votes });
	}

	onThumbDown() {
		const votes = this.ratingSrv.thumbDown(this.product);
		this.updateProduct({ votes });
	}

	/** update the product */
	updateProduct(product: Product) {
		this.featureSrv
			.update({ id: this.product.id, ...product })
			.subscribe();
	}

	/** when deleting this product */
	deleteProduct(product: Product) {
		const text = this.translate.instant('message.confirm-delete-product');
		this.dlgSrv.open(ConfirmDialogComponent, { text }).pipe(
			filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
			switchMap(_ => this.featureSrv.delete(product.id))
		).subscribe(_ => this.router.navigate(['products']));
	}

	openSupplierRequest(product: Product) {
		this.dlgSrv.open(SupplierRequestDialogComponent, { products: [product] });
	}

	hasBadge(type: string) {
		if (!this.product)
			return;

		switch (type) {
			case 'tasks': return this.product.tasksLinkedAssignedToMe.count > 0;
			case 'samples': return this.product.samplesLinkedAssignedToMe.count > 0;
			case 'requests': return this.requestCount > 0;
		}
	}

	/** navigate to project details */
	openProjectDetails(project: Project) {
		this.router.navigate(['projects', project.id || '']);
	}

	/** open preview */
	openPreview() {
		this.previewOpened = true;
	}

	/**
	 * open task preview and sets sample to null
	 * @param task
	 */
	openTaskPreview(task: Task) {
		this.task = task;
		this.sample = null;
		this.openPreview();
	}
	/**
	 * open sample preview and sets task to null
	 * @param sample
	 */
	openSamplePreview(sample: Sample) {
		this.sample = sample;
		this.task = null;
		this.openPreview();
	}

	/** close preview and sets task & sample to null */
	closePreview() {
		this.task = null;
		this.sample = null;
		this.previewOpened = false;
	}

	/** redirects to a page inside products and scroll into that view */
	goToTable(page: string) {
		// if we dont scroll after the navigate, the navigation will stop the scroll mid-way
		this.router.navigate(['products', this.product.id, page]).then(_ => {
			this.main.nativeElement.scrollIntoView({ behavior: 'smooth' });
		});
	}

	goToSupplier(supplier: Supplier) {
		this.router.navigate(['suppliers', supplier.id]);
	}

	scrollToRating() {
		this.rating.nativeElement.scrollIntoView({ behavior: 'smooth' });
	}

	dissociateProject(productProjects: Project[], projectToDelete: Project) {
		const projects = (productProjects || []).filter(project => project.id !== projectToDelete.id);
		this.updateProduct({ projects });
	}

}
