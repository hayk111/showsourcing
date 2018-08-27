import { Component, OnInit, NgModuleRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ProductFeatureService } from '~features/products/services';
import { AppFile, Product, Project, AppImage, ProductStatus, ERM } from '~models';
import { DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils';
import {
	ProductAddToProjectDlgComponent, ProductRequestTeamFeedbackDlgComponent
} from '~shared/custom-dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { VoteDetailsDialogComponent } from '~features/products/components/vote-details-dialog/vote-details-dialog.component';


@Component({
	selector: 'product-details-app',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent extends AutoUnsub implements OnInit {
	product$: Observable<Product>;
	files: Array<AppFile>;
	/** projects for this product */
	product: Product;
	typeEntity = ERM.PRODUCT;

	constructor(
		private route: ActivatedRoute,
		private featureSrv: ProductFeatureService,
		private dlgSrv: DialogService,
		private moduleRef: NgModuleRef<any>,
		private router: Router) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.params.pipe(
			takeUntil(this._destroy$),
			map(params => params.id),
		);

		this.product$ = id$.pipe(
			switchMap(id => this.featureSrv.selectOne(id)),
			tap(product => this.product = product)
		);

	}

	/** opens the dialog to add multiple project to product.projects */
	openAddProjectDlg() {
		this.dlgSrv.openFromModule(ProductAddToProjectDlgComponent, this.moduleRef, { selectedProducts: [this.product] });
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog() {
		this.dlgSrv.openFromModule(ProductRequestTeamFeedbackDlgComponent, this.moduleRef, {
			selectedProducts: this.product
		});
	}

	/** remove project from product.projects */
	removeProject(project: Project) {
		// mapping project to their respective id, to not inadvertently change other props, then removing
		// the project we need to from the array
		const projects = Array.from(this.product.projects, p => ({ id: p.id })).filter(p => p.id !== project.id);
		this.featureSrv.update({ id: this.product.id, projects }).subscribe();
	}

	/** item status update */
	updateStatus(statusId: string) {
		const prodS = new ProductStatus({ status: { id: statusId } });
		this.featureSrv.update({ id: this.product.id, statuses: [prodS, ...this.product.statuses] }).subscribe();
	}

	/** item has been favorited */
	onFavorited() {
		this.featureSrv.update({ id: this.product.id, favorite: true }).subscribe();
	}

	/** item has been unfavorited */
	onUnfavorited() {
		this.featureSrv.update({ id: this.product.id, favorite: false }).subscribe();
	}

	/** update the product */
	updateProduct(product: any) {
		this.featureSrv.update({ id: this.product.id, ...product }).subscribe();
	}

	/** when a new image is uploaded we add it to the list of images of the product */
	onNewImages(imgs: AppImage[]) {
		this.featureSrv
			.update({ id: this.product.id, images: [...this.product.images, ...imgs] })
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
	export() {
		// TODO
	}

	/** Opens a dialog that let you see the list of people who have voted */
	openVoteDetailsDialog() {
		this.dlgSrv.openFromModule(VoteDetailsDialogComponent, this.moduleRef, { votes: this.product.votes });
	}
}
