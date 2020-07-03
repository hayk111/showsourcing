import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { api, Product, Sample, Project, Task, Supplier } from 'lib';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { SupplierRequestDialogComponent } from '~common/dialogs/custom-dialogs/supplier-request-dialog/supplier-request-dialog.component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { DialogService } from '~shared/dialog';
import { ToastService, ToastType } from '~shared/toast';
import { AutoUnsub, log } from '~utils';


/**
 *
 * My old aunts would come and tease me at weddings, “Well Sarah? Do you think you’ll be next?”
 *  -
 * We’ve settled this quickly once I’ve started doing the same to them at funerals.
 *
 */

@Component({
	selector: 'details-page-app',
	templateUrl: './details-page.component.html',
	styleUrls: ['./details-page.component.scss'],
	host: { class: 'details-page' }
})
export class DetailsPageComponent extends AutoUnsub implements OnInit {
	@Input() requestCount: number;
	@ViewChild('main', { read: ElementRef, static: false }) main: ElementRef;
	@ViewChild('rating', { read: ElementRef, static: false }) rating: ElementRef;

	product: Product;
	product$: Observable<Product>;

	// sample & task used for the preview
	sample: Sample;
	task: Task;
	previewOpened = false;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private dlgSrv: DialogService,
		private toastSrv: ToastService,
		public dlgCommonSrv: DialogCommonService,
	) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.params.pipe(
			map(params => params.id),
			takeUntil(this._destroy$)
		);

		this.product$ = id$.pipe(
			switchMap(id => api.Product.get(id)),
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
			this.toastSrv.add({
				type: ToastType.ERROR,
				title: 'title.product-not-exist',
				timeout: 3500
			});
			this.router.navigate(['products']);
		} else {
			this.product = product;
		}
	}

	private onError(error) {
		log.error(error);
		this.toastSrv.add({
			type: ToastType.ERROR,
			title: 'title.error',
			message: 'message.there-is-an-error',
			timeout: 3500
		});
		this.router.navigate(['products']);
	}

	onArchive(product: Product | Product[]) {
		// TODO add this in a shared Archive service

		// if (Array.isArray(product)) {
		// 	this.productSrv.updateMany(product.map((p: Product) => ({ id: p.id, archived: true })))
		// 		.subscribe(_ => {
		// 			this.toastSrv.add({
		// 				type: ToastType.SUCCESS,
		// 				title: 'title.products-archived',
		// 				message: 'message.products-archived-successfully'
		// 			});
		// 		});
		// } else {
		// 	const { id } = product;
		// 	this.productSrv.update({ id, archived: true })
		// 		.subscribe(_ => {
		// 			this.toastSrv.add({
		// 				type: ToastType.SUCCESS,
		// 				title: 'title.product-archived',
		// 				message: 'message.product-archived-successfully'
		// 			});
		// 		});
		// }
	}

	/** item status update */
	updateStatus(statusId: string) {
		api.col('Product')
			.update([{ id: this.product.id, status: { id: statusId } } as any])
			.subscribe();
	}

	/** item has been favorited */
	onFavorited() {
		api.col('Product')
			.update([{ id: this.product.id, favorite: true } as any])
			.subscribe();
	}

	/** item has been unfavorited */
	onUnfavorited() {
		api.col('Product')
			.update([{ id: this.product.id, favorite: false } as any])
			.subscribe();
	}

	onThumbUp() {
		// const votes = this.ratingSrv.thumbUp(this.product, EntityName.PRODUCT);
		// this.updateProduct({ votes });
	}

	onThumbDown() {
		// const votes = this.ratingSrv.thumbDown(this.product, EntityName.PRODUCT);
		// this.updateProduct({ votes });
	}

	/** update the product */
	updateProduct(product: Product) {
		api.col('Product')
			.update([{ id: this.product.id, ...product } as any])
			.subscribe();
	}

	/** when deleting this product */
	deleteProduct(product: Product) {
		// const text = this.translate.instant('message.confirm-delete-product');
		// this.dlgSrv.open(ConfirmDialogComponent, { text }).pipe(
		// 	filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
		// 	switchMap(_ => this.productSrv.delete(product.id))
		// ).subscribe(_ => this.router.navigate(['products']));
	}

	openSupplierRequest(product: Product) {
		this.dlgSrv.open(SupplierRequestDialogComponent, { products: [product] });
	}

	hasBadge(type: string) {
		if (!this.product)
			return;

		// switch (type) {
		// 	case 'tasks': return this.product.tasksLinkedAssignedToMe.count > 0;
		// 	case 'samples': return this.product.samplesLinkedAssignedToMe.count > 0;
		// 	case 'requests': return this.requestCount > 0;
		// }
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
		// const projects = (productProjects || []).filter(project => project.id !== projectToDelete.id);
		// this.updateProduct({ projects });
	}

}
