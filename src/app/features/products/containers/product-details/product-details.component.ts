import { Component, NgModuleRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { VoteDetailsDialogComponent } from '~features/products/components/vote-details-dialog/vote-details-dialog.component';
import { ProductFeatureService } from '~features/products/services';
import { ProductQueries } from '~entity-services/product/product.queries';
import { Attachment, ERM, Product, ProductStatus, Project } from '~models';
import {
	ProductAddToProjectDlgComponent,
	ProductExportDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
	RfqDialogComponent,
} from '~common/modals';
import { DialogService } from '~shared/dialog/services';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { NotificationService, NotificationType } from '~shared/notifications';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { AutoUnsub } from '~utils';

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
		private notifSrv: NotificationService,
		private router: Router,
		private thumbSrv: ThumbService
	) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.params.pipe(
			takeUntil(this._destroy$),
			map(params => params.id)
		);

		id$.pipe(
			switchMap(id => this.featureSrv.selectOne(id))
		).subscribe(
			product => this.onProduct(product),
			err => this.onError(err)
		);
	}

	private onProduct(product) {
		if (!product) {
			this.notifSrv.add({
				type: NotificationType.ERROR,
				title: 'The product doesn\'t exist',
				timeout: 3500
			});
			this.router.navigate(['product']);
		} else {
			this.product = product;
		}
	}

	private onError(error) {
		this.notifSrv.add({
			type: NotificationType.ERROR,
			title: 'Error',
			message: 'There is an error, please try again later',
			timeout: 3500
		});
		this.router.navigate(['product']);
	}

	/** opens the dialog to add multiple project to product.projects */
	openAddProjectDlg() {
		this.dlgSrv.open(
			ProductAddToProjectDlgComponent,
			{ selectedProducts: [this.product] }
		);
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog() {
		this.dlgSrv.open(
			ProductRequestTeamFeedbackDlgComponent,
			{ selectedProducts: [this.product] }
		);
	}

	openRequestQuotationDialog() {
		this.dlgSrv.open(RfqDialogComponent, { product: this.product });
	}

	/** when file has been removed we remove link */
	onFileRemoved(attachment: Attachment) {
		const attachments = this.product.attachments.filter(
			atc => atc.id !== attachment.id
		);
		this.updateProduct({ attachments });
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
		// here we dont need the timeout to wait for the server to update the score
		// since this is a select isntead of a query one
	}

	onThumbDown() {
		const votes = this.thumbSrv.thumbDown(this.product);
		this.updateProduct({ votes });
		// here we dont need the timeout to wait for the server to update the score
		// since this is a select isntead of a query one
	}

	/** update the product */
	updateProduct(product: any) {
		this.featureSrv
			.update({ id: this.product.id, ...product })
			.subscribe();
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
	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog(product: Product) {
		this.dlgSrv.open(ProductExportDlgComponent, {
			selectedProducts: [this.product]
		});
	}
	/** Opens a dialog that let you see the list of people who have voted */
	openVoteDetailsDialog() {
		this.dlgSrv.open(VoteDetailsDialogComponent, {
			votes: this.product.votes
		});
	}
}
