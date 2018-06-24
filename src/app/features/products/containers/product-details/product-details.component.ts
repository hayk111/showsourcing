import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil, tap, map } from 'rxjs/operators';
import { AppFile, Project } from '~models';
import { UserService } from '../../../../global-services';
import { DialogName, DialogService } from '~shared/dialog';
import { Product } from '~models';
import { AutoUnsub } from '~utils';
import { ProductFeatureService } from '~features/products/services';
import { FormGroup } from '@angular/forms';


@Component({
	selector: 'product-details-app',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent extends AutoUnsub implements OnInit {
	product$: Observable<Product>;
	files: Array<AppFile>;
	projectDlgName = DialogName.ADD_TO_PROJECT;
	// tasks$: Observable<Array<Task>>;
	/** projects for this product */
	projects$: Observable<Project[]>;
	productId: string;

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
			tap(id => this.productId = id)
		);

		// getting supplier
		this.product$ = id$.pipe(
			switchMap(id => this.featureSrv.selectOne(id))
		);

		this.projects$ = id$.pipe(
			switchMap(id => this.featureSrv.selectProjectsForProduct(id))
		);

	}

	openAddProjectDlg() {
		this.dlgSrv.open(this.projectDlgName, { selectedProducts: [this.productId] });
	}

	removeProject(project: Project) {
		const updatedProject = {
			id: project.id,
			products: project.products.filter(product => product.id !== this.productId)
		};
		this.featureSrv.updateProject(updatedProject).subscribe();
	}

	updateStatus(statusId: string) {
		this.featureSrv.updateProduct({ id: this.productId, status: { id: statusId } }).subscribe();
	}

	onFavorited() {
		this.featureSrv.updateProduct({ id: this.productId, favorite: true }).subscribe();
	}

	onUnfavorited() {
		this.featureSrv.updateProduct({ id: this.productId, favorite: false }).subscribe();
	}
}
