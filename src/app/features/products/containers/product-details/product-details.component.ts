import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil, tap, map } from 'rxjs/operators';
import { AppFile, EntityTarget } from '~app/entity';
import { UserService } from '~app/features/user';
import { DialogName, fromDialog } from '~app/shared/dialog';
import { FilterGroupName } from '~app/shared/filters';
import { Product } from '~models';
import { AutoUnsub } from '~utils';
import { ProductService } from '~app/features/products/services';


@Component({
	selector: 'product-details-app',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent extends AutoUnsub implements OnInit {
	filterGroupName: FilterGroupName.PRODUCT_PAGE;
	product$: Observable<Product>;
	target: EntityTarget;
	files: Array<AppFile>;
	projectDlgName = DialogName.ADD_TO_PROJECT;
	// tasks$: Observable<Array<Task>>;
	productId: string;

	constructor(
		private route: ActivatedRoute,
		private store: Store<any>,
		private userSrv: UserService,
		private productSrv: ProductService) {
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
			switchMap(id => this.productSrv.getById(id))
		);

		// this.tasks$ = id$.pipe(
		// 	switchMap(id => this.productSrv.getTasks(id))
		// );
	}

	openAddProjectDlg() {
		// this.store.dispatch(fromDialog.Actions.open(this.projectDlgName, { selectedProducts: [this.productId] }));
	}

	removeProject(project) {
		// this.store.dispatch(productActions.removeProject(project, this.productId));
	}

	updateStatus(statusId: string) {
		// this.store.dispatch(productActions.patch({ propName: 'status', value: statusId, id: this.productId }));
	}

	onFavorited() {
		// this.store.dispatch(productActions.patch({ propName: 'rating', value: 5, id: this.productId }));
	}

	onUnfavorited() {
		// this.store.dispatch(productActions.patch({ propName: 'rating', value: 1, id: this.productId }));
	}
}
