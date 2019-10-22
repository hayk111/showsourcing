import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { CommonModalService } from '~common/modals';
import { SupplierRequestDialogComponent } from '~common/modals/custom/supplier-request-dialog/supplier-request-dialog.component';
import { ProductFeatureService } from '~features/products/services';
import { ERM, Product, Project } from '~models';
import { CloseEvent, CloseEventType, DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { NotificationService, NotificationType } from '~shared/notifications';
import { ThumbService } from '~shared/rating/services/thumbs.service';
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
	product: Product;
	/** projects for this product */
	typeEntity = ERM.PRODUCT;
	tabs: { name: string, number$?: Observable<number> }[];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private featureSrv: ProductFeatureService,
		private dlgSrv: DialogService,
		private notifSrv: NotificationService,
		private thumbSrv: ThumbService,
		public commonModalSrv: CommonModalService,
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

	openSupplierRequest(product: Product) {
		this.dlgSrv.open(SupplierRequestDialogComponent, { products: [product] });
	}

}
