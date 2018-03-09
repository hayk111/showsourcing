import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators';
import { AppComment } from '~comment';
import { EntityTarget, ERM, EntityState } from '~entity';
import { AppFile, selectFilesAsArray, FileActions } from '~features/file';
import { Product } from '~products/models';
import { ProductActions } from '~products/store';
import { selectProductFocused } from '~products/store';
import { ProjectTargetActions } from '~store/action/target/project.action';
import { TargetAction } from '~store/action/target/target.action';
import { selectProjectsForCurrentTarget } from '~store/selectors/target/target.selector';
import { AutoUnsub } from '~utils';
import { UserService } from '~app/features/user';
import { DialogName } from '~app/shared/dialog';
import {
	selectProjectsProductsCount,
	selectProjects,
	Project,
	selectProjectsState,
} from '~app/features/projects';

@Component({
	selector: 'product-page-app',
	templateUrl: './product-page.component.html',
	styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent extends AutoUnsub implements OnInit {
	product$: Observable<Product>;
	target: EntityTarget;
	files: Array<AppFile>;
	comments: Array<AppComment>;
	projectRep = ERM.projects;
	projects$: Observable<Array<Project>>;
	files$: Observable<Array<AppFile>>;
	projectDlgName = DialogName.ADDTOPROJECT;
	productsCount$: Observable<number>;

	constructor(
		private route: ActivatedRoute,
		private store: Store<any>,
		private userSrv: UserService
	) {
		super();
	}

	ngOnInit() {
		this.route.params.pipe(takeUntil(this._destroy$)).subscribe(params => {
			const id = params['id'];
			this.target = { entityId: id, entityRepr: ERM.product };
			this.store.dispatch(TargetAction.select(this.target));
			this.store.dispatch(ProductActions.loadById(id));
		});
		this.product$ = this.store.select(selectProductFocused);
		this.projects$ = this.store.select(selectProjects);
		this.files$ = this.store.select(selectFilesAsArray);
		this.productsCount$ = this.store.select<any>(selectProjectsProductsCount);
	}

	onProjectAdded(event) {
		// this.store.dispatch(ProjectTargetActions.add(event));
	}

	onProjectRemoved(event) {
		// this.store.dispatch(ProjectTargetActions.remove(event));
	}

	onFileAdded(files: Array<File>) {
		const appFiles = files.map(file => new AppFile(file, this.userSrv.userId));
		this.store.dispatch(FileActions.add(appFiles));
	}

	onFileRemoved(file: AppFile) {
		this.store.dispatch(FileActions.delete([file.id]));
	}
}
