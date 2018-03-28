import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap, takeUntil } from 'rxjs/operators';
import { UserService } from '~app/features/user';
import { DialogActions, DialogName } from '~app/shared/dialog';
import {
	AppComment,
	AppFile,
	EntityTarget,
	ERM,
	Product,
	productActions,
	Project,
	selectProductById,
	selectProjects,
	selectProjectsProductsCount,
	selectTasks,
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
	projectRep = ERM.projects;
	projects$: Observable<Array<Project>>;
	projectDlgName = DialogName.ADD_TO_PROJECT;
	productsCount$: Observable<number>;
	tasks$: Observable<Array<Task>>;

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
			switchMap(params => this.store.select(selectProductById(params.id)))
		);
		this.projects$ = this.store.select(selectProjects);
		this.productsCount$ = this.store.select<any>(selectProjectsProductsCount);
		this.tasks$ = this.store.select(selectTasks);
	}

	openAddProjectDlg() {
		this.store.dispatch(DialogActions.open(this.projectDlgName));
	}

	addToProjects(selectedProjects: any, productId: string) {
		const projects = Object.values(selectedProjects);
		projects.forEach((project: Project) => this.store.dispatch(productActions.addProject(project, productId)));
		this.store.dispatch(DialogActions.close(this.projectDlgName));
	}

	removeProject(project, productId: string) {
		this.store.dispatch(productActions.removeProject(project, productId));
	}

	updateStatus(statusId: string, productId: string) {
		this.store.dispatch(productActions.patch({ propName: 'status', value: statusId, id: productId }));
	}

	onFavorited(productId: string) {
		this.store.dispatch(productActions.patch({ propName: 'rating', value: 5, id: productId }));
	}

	onUnfavorited(productId: string) {
		this.store.dispatch(productActions.patch({ propName: 'rating', value: 1, id: productId }));
	}
}
