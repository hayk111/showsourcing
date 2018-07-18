import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ProductFeatureService } from '~features/products/services';
import { AppFile, Product, Project, AppImage, ProductStatus } from '~models';
import { DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils';
import {
	ProductAddToProjectDlgComponent
} from '~features/products/components/product-add-to-project-dlg/product-add-to-project-dlg.component';


@Component({
	selector: 'product-details-app',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent extends AutoUnsub implements OnInit {
	product$: Observable<Product>;
	files: Array<AppFile>;
	// tasks$: Observable<Array<Task>>;
	/** projects for this product */
	projects$: Observable<Project[]>;
	product: Product;

	constructor(
		private route: ActivatedRoute,
		private featureSrv: ProductFeatureService,
		private dlgSrv: DialogService) {
		super();
	}

	ngOnInit() {
		// getting the id of the supplier
		const id$ = this.route.params.pipe(
			takeUntil(this._destroy$),
			map(params => params.id),
		);

		// getting supplier
		this.product$ = id$.pipe(
			switchMap(id => this.featureSrv.selectOne(id)),
			tap(product => this.product = product)
		);

		this.projects$ = id$.pipe(
			switchMap(id => this.featureSrv.selectProjectsForProduct(id))
		);

	}

	openAddProjectDlg() {
		this.dlgSrv.open(ProductAddToProjectDlgComponent, { selectedProducts: [this.product.id] });
	}

	removeProject(project: Project) {
		const updatedProject = {
			id: project.id,
			products: project.products.filter(product => product.id !== this.product.id)
		};
		this.featureSrv.updateProject(updatedProject).subscribe();
	}

	updateStatus(statusId: string) {
		const prodS = new ProductStatus({ status: { id: statusId } });
		this.featureSrv.update({ id: this.product.id, statuses: [prodS, ...this.product.statuses] }).subscribe();
	}

	onFavorited() {
		this.featureSrv.update({ id: this.product.id, favorite: true }).subscribe();
	}

	onUnfavorited() {
		this.featureSrv.update({ id: this.product.id, favorite: false }).subscribe();
	}

	onNewImages(imgs: AppImage[]) {
		this.featureSrv
			.update({ id: this.product.id, images: [...this.product.images, ...imgs] })
			.subscribe();
	}
}
