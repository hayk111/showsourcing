import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap, takeUntil } from 'rxjs/operators';
import { AppComment } from '~comment';
import { EntityTarget, ERM, EntityState } from '~entity';
import { AppFile, selectFilesAsArray, FileActions } from '~features/file';
import { Product } from '~products/models';
import { ProductActions } from '~products/store';
import { AutoUnsub } from '~utils';
import { UserService } from '~app/features/user';
import { DialogName, DialogActions } from '~app/shared/dialog';
import {
	selectProjectsProductsCount,
	selectProjects,
	Project,
	selectProjectsState,
	ProjectActions,
} from '~app/features/projects';

import { selectProductById } from './../../store/product.selector';

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
	projectDlgName = DialogName.ADDTOPROJECT;
	productsCount$: Observable<number>;

	constructor(private route: ActivatedRoute, private store: Store<any>, private userSrv: UserService) {
		super();
	}

	ngOnInit() {
		this.route.params.pipe(takeUntil(this._destroy$)).subscribe(params => {
			const id = params['id'];
			this.store.dispatch(ProductActions.select(id));
			this.store.dispatch(ProductActions.loadById(id));
		});
		this.product$ = this.route.params.pipe(
			takeUntil(this._destroy$),
			switchMap(params => this.store.select(selectProductById(params.id)))
		);
		this.projects$ = this.store.select(selectProjects);
		this.productsCount$ = this.store.select<any>(selectProjectsProductsCount);
	}

	openAddProjectDlg() {
		this.store.dispatch(DialogActions.open(this.projectDlgName));
	}

	addToProjects(selectedProjects: any, productId: string) {
		const projects = Object.values(selectedProjects);
		projects.forEach((project: Project) => this.store.dispatch(ProductActions.addProject(project, productId)));
		this.store.dispatch(DialogActions.close(this.projectDlgName));
	}

	removeProject(project, productId: string) {
		this.store.dispatch(ProductActions.removeProject(project, productId));
	}
}
