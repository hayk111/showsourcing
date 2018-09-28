import { Component, OnInit, NgModuleRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ProductFeatureService } from '~features/products/services';
import {
	Attachment,
	Product,
	Project,
	AppImage,
	ProductStatus,
	ERM
} from '~models';
import { DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils';
import {
	ProductAddToProjectDlgComponent,
	ProductRequestTeamFeedbackDlgComponent
} from '~shared/custom-dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { VoteDetailsDialogComponent } from '~features/products/components/vote-details-dialog/vote-details-dialog.component';
import { ProductQueries } from '~global-services/product/product.queries';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';
import { NotificationService, NotificationType } from '~shared/notifications';

@Component({
	selector: 'product-details-app',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent extends AutoUnsub implements OnInit {
	// product$: Observable<Product>;
	files: Array<Attachment>;
	/** projects for this product */
	product: Product = null;
	typeEntity = ERM.PRODUCT;

	constructor(
		private route: ActivatedRoute,
		private featureSrv: ProductFeatureService,
		private dlgSrv: DialogService,
		private moduleRef: NgModuleRef<any>,
		private notifSrv: NotificationService,
		private router: Router
	) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.params.pipe(
			takeUntil(this._destroy$),
			map(params => params.id)
		);
		id$.subscribe(id => {
			this.featureSrv.selectOne(id).subscribe(
				_product => {
					if (Object.keys(_product).length === 0 || !_product) {
						this.notifSrv.add({
							type: NotificationType.ERROR,
							title: 'The product doesn\'t exist',
							timeout: 3500
						});
						this.router.navigate(['product']);
					} else {
						this.product = _product;
					}
				},
				err => {
					this.notifSrv.add({
						type: NotificationType.ERROR,
						title: 'Error',
						message: 'There is an error, please try again later',
						timeout: 3500
					});
					this.router.navigate(['product']);
				}
			);
		});
	}

	/** opens the dialog to add multiple project to product.projects */
	openAddProjectDlg() {
		this.dlgSrv.openFromModule(
			ProductAddToProjectDlgComponent,
			this.moduleRef,
			{ selectedProducts: [this.product] }
		);
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog() {
		this.dlgSrv.openFromModule(
			ProductRequestTeamFeedbackDlgComponent,
			this.moduleRef,
			{
				selectedProducts: [this.product]
			}
		);
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
		const status = new ProductStatus({ status: { id: statusId } });
		this.featureSrv
			.update({ id: this.product.id, status }, ProductQueries.status)
			.subscribe();
	}

	/** item has been favorited */
	onFavorited() {
		this.featureSrv
			.update({ id: this.product.id, favorite: true }, 'favorite')
			.subscribe();
	}

	/** item has been unfavorited */
	onUnfavorited() {
		this.featureSrv
			.update({ id: this.product.id, favorite: false }, 'favorite')
			.subscribe();
	}

	/** update the product */
	updateProduct(product: any, fields?: string) {
		this.featureSrv
			.update({ id: this.product.id, ...product }, fields)
			.subscribe();
	}

	updateProductVotes(product: any) {
		this.updateProduct(product, 'votes { id, value, user { id } }');
	}

	/** when a new image is uploaded we add it to the list of images of the product */
	onNewImages(imgs: AppImage[]) {
		this.featureSrv
			.update({
				id: this.product.id,
				images: [...this.product.images, ...imgs]
			})
			.subscribe();
	}

	/** when image is deleted */
	onImageDeleted(img: AppImage) {
		const images = this.product.images.filter(image => image.id !== img.id);
		this.updateProduct({ images });
	}

	/** when file has been uploaded we link it */
	onFileAdded(added: Attachment[]) {
		const attachments = [...this.product.attachments, ...added];
		this.updateProduct({ attachments });
	}

	/** when file has been removed we remove link */
	onFileRemoved(attachment: Attachment) {
		const attachments = this.product.attachments.filter(
			atc => atc.id !== attachment.id
		);
		this.updateProduct({ attachments });
	}

	/** when deleting this product */
	deleteProduct() {
		const callback = () => {
			this.featureSrv.delete(this.product.id).subscribe();
			this.router.navigate(['product']);
		};
		const text = `Are you sure you want to delete this product?`;
		this.dlgSrv.open(ConfirmDialogComponent, { text, callback });
	}

	/** export product */
	export() {
		// TODO
	}

	/** Opens a dialog that let you see the list of people who have voted */
	openVoteDetailsDialog() {
		this.dlgSrv.openFromModule(VoteDetailsDialogComponent, this.moduleRef, {
			votes: this.product.votes
		});
	}
}
