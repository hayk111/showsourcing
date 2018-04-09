import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap, takeUntil, tap, filter } from 'rxjs/operators';
import { UserService } from '~app/features/user';
import { fromDialog, DialogName } from '~app/shared/dialog';
import {
	AppComment,
	AppFile,
	EntityTarget,
	ERM,
	Product,
	productActions,
	Project,
	selectProductById,
	fromProject,
	fromTask,
	Task,
} from '~entity';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'product-details-app',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent extends AutoUnsub implements OnInit {
	product$: Observable<Product>;
	target: EntityTarget;
	files: Array<AppFile>;
	comments: Array<AppComment>;
	projectDlgName = DialogName.ADD_TO_PROJECT;
	tasks$: Observable<Array<Task>>;
	productId: string;

	constructor(private route: ActivatedRoute, private store: Store<any>, private userSrv: UserService) {
		super();
	}

	ngOnInit() {
		this.route.params.pipe(takeUntil(this._destroy$)).subscribe(params => {
			const id = params.id;
			this.store.dispatch(productActions.focus(id));
		});
		this.product$ = this.route.params.pipe(
			takeUntil(this._destroy$),
			switchMap(params => this.store.select(selectProductById(params.id))),
			filter(product => !!product),
			tap(product => this.productId = product.id)
		);
		this.tasks$ = this.store.select(fromTask.selectArray);
	}

	openAddProjectDlg() {
		this.store.dispatch(fromDialog.Actions.open(this.projectDlgName, { selectedProducts: [this.productId] }));
	}

	removeProject(project) {
		this.store.dispatch(productActions.removeProject(project, this.productId));
	}

	updateStatus(statusId: string) {
		this.store.dispatch(productActions.patch({ propName: 'status', value: statusId, id: this.productId }));
	}

	onFavorited() {
		this.store.dispatch(productActions.patch({ propName: 'rating', value: 5, id: this.productId }));
	}

	onUnfavorited() {
		this.store.dispatch(productActions.patch({ propName: 'rating', value: 1, id: this.productId }));
	}
}
