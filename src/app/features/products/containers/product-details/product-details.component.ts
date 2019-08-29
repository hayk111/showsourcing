import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil, filter } from 'rxjs/operators';
import { CommonModalService } from '~common/modals';
import { SampleService, UserService, TaskService, SupplierRequestService, RequestElementService } from '~core/entity-services';
import { ProductFeatureService } from '~features/products/services';
import { Attachment, ERM, Product, Project } from '~models';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { DialogService, CloseEvent, CloseEventType } from '~shared/dialog';
import { NotificationService, NotificationType } from '~shared/notifications';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { AutoUnsub, log } from '~utils';
import { SupplierRequestDialogComponent } from '~common/modals/component/supplier-request-dialog/supplier-request-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'product-details-app',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent extends AutoUnsub implements OnInit {

	previewOpen = false;
	product: Product;
	files: Array<Attachment>;
	/** projects for this product */
	typeEntity = ERM.PRODUCT;
	sampleCount$: Observable<number>;
	taskCount$: Observable<number>;
	requestCount$: Observable<number>;

	tabs: { name: string, number$?: Observable<number> }[];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private featureSrv: ProductFeatureService,
		private dlgSrv: DialogService,
		private notifSrv: NotificationService,
		private thumbSrv: ThumbService,
		public commonModalSrv: CommonModalService,
		private sampleSrv: SampleService,
		private taskSrv: TaskService,
		private userSrv: UserService,
		private requestElementSrv: RequestElementService,
		private translate: TranslateService
	) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.params.pipe(
			map(params => params.id),
			takeUntil(this._destroy$)
		);

		id$.pipe(
			switchMap(id => this.featureSrv.selectOne(id)),
			takeUntil(this._destroy$)
		).subscribe(
			product => this.onProduct(product),
			err => this.onError(err)
		);

		this.sampleCount$ = id$.pipe(
			switchMap(id => this.sampleSrv
				.selectCount(`product.id == "${id}" AND deleted == false`)),
			takeUntil(this._destroy$)
		);

		this.taskCount$ = id$.pipe(
			switchMap(id => this.taskSrv
				.selectCount(`product.id == "${id}" AND done == false AND deleted == false`)),
			takeUntil(this._destroy$)
		);

		this.requestCount$ = id$.pipe(
			switchMap(id => this.requestElementSrv
				.selectCount(`targetId == "${id}" AND targetedEntityType == "Product"`)),
			takeUntil(this._destroy$)
		);

		this.tabs = [
			{ name: this.translate.instant('label.activity') },
			{ name: this.translate.instant('label.shipping') },
			{ name: this.translate.instant('ERM.SAMPLE.plural'), number$: this.sampleCount$ },
			{ name: this.translate.instant('ERM.TASK.plural'), number$: this.taskCount$ },
			{ name: this.translate.instant('ERM.SUPPLIER_REQUEST.plural'), number$: this.requestCount$ }
		];
	}

	private onProduct(product) {
		if (!product) {
			this.notifSrv.add({
				type: NotificationType.ERROR,
				title: this.translate.instant('title.product-not-exist'),
				timeout: 3500
			});
			this.router.navigate(['product']);
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
		this.router.navigate(['product']);
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


	/** remove project from product.projects */
	removeProject(removed: Project) {
		// mapping project to their respective id, to not inadvertently change other props, then removing
		// the project we need to from the array
		const projects = this.product.projects.filter(p => p.id !== removed.id);
		this.featureSrv.update({ id: this.product.id, projects }).subscribe();
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
		const votes = this.thumbSrv.thumbUp(this.product);
		this.updateProduct({ votes });
	}

	onThumbDown() {
		const votes = this.thumbSrv.thumbDown(this.product);
		this.updateProduct({ votes });
	}

	/** update the product */
	updateProduct(product: any) {
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
		).subscribe(_ => this.router.navigate(['product']));
	}

	closePreview() {
		this.previewOpen = false;
	}

	openPreview() {
		this.previewOpen = true;
	}

	openSupplierRequest(product: Product) {
		this.dlgSrv.open(SupplierRequestDialogComponent, { products: [product] });
	}
}
