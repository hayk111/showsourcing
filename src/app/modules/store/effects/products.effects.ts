import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { ActionType, ProductActions } from '../action/product.action';
import { TypedAction } from '../utils/typed-action.interface';
import { switchMap, map, merge, mergeMap, startWith, tap, filter } from 'rxjs/operators';
import { zip } from 'rxjs/observable/zip';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { User } from '../model/user.model';
import { selectUser } from '../selectors/user.selector';
import { AppComment } from '../model/comment.model';
import { uuid } from '../utils/uuid.utils';
import { AppFile } from '../model/app-file.model';
import { ProductService } from '../services/product.service';
import { selectProductById } from '../selectors/products.selector';
import { Product } from '../model/product.model';
import { Tag } from '../model/tag.model';
import { Project } from '../model/project.model';
import { Task } from '../model/task.model';
import { TaskActions } from '../action/task.action';


@Injectable()
export class ProductEffects {
	userID: string;


	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap(filterGroupName => {
			// get products
			return this.srv.load(filterGroupName).pipe(
				// set products
				map(r => ProductActions.set(r)),
				// before everything set products as pending
				startWith(ProductActions.setPending() as any)
			);
		})
	);

	// loads a product if it's not already present in the store
	@Effect()
	loadOne$ = this.actions$.ofType<any>(ActionType.LOAD_BY_ID).pipe(
		map(action => action.payload),
		switchMap(id => this.store.select(selectProductById(id)).pipe(
			filter(product => product === undefined),
			switchMap(_ => this.srv.loadById(id).pipe(
				tap( __ => this.store.dispatch(ProductActions.loadTags(id))),
				tap( __ => this.store.dispatch(ProductActions.loadProjects(id))),
			)),
		)),
		map((product: Product) => ProductActions.add([product]))
	);

	@Effect()
	loadTags$ = this.actions$.ofType<any>(ActionType.LOAD_TAGS).pipe(
		map(action => action.payload),
		switchMap(
			id => this.srv.sendTagReq(id)
			.map((tags: Array<Tag>) => ProductActions.setTags(tags, id))
		)
	);

	@Effect({ dispatch: false })
	addTag$ = this.actions$.ofType<any>(ActionType.ADD_TAG).pipe(
		map(action => action.payload),
		switchMap(({tag, id}) => this.srv.addTag(tag, id))
	);

	@Effect({ dispatch: false })
	addProject$ = this.actions$.ofType<any>(ActionType.ADD_PROJECT).pipe(
		map(action => action.payload),
		switchMap(({project, id}) => this.srv.addProject(project, id))
	);

	@Effect({ dispatch: false })
	removeTag$ = this.actions$.ofType<any>(ActionType.REMOVE_TAG).pipe(
		map( action => action.payload),
		switchMap(({ id, tag}) => this.srv.removeTag(tag, id))
	);

	@Effect({ dispatch: false })
	removeProject$ = this.actions$.ofType<any>(ActionType.REMOVE_PROJECT).pipe(
		map( action => action.payload),
		switchMap(({ id, project}) => this.srv.removeProject(project, id))
	);

	@Effect()
	loadProjects$ = this.actions$.ofType<any>(ActionType.LOAD_PROJECTS).pipe(
		map(action => action.payload),
		switchMap(
			id => this.srv.sendProjectReq(id)
			.map((projs: Array<Project>) => ProductActions.setProjects(projs, id))
		)
	);

	@Effect()
	loadTasks$ = this.actions$.ofType<any>(ActionType.LOAD_TASKS).pipe(
		map(action => action.payload),
		switchMap(id => this.srv.sendTaskReq(id)),
		map((t: Array<Task>) => TaskActions.set(t))
	);


	constructor(private srv: ProductService, private actions$: Actions, private store: Store<any>) {
		this.store.select(selectUser).map(user => user.id)
			.subscribe(id => this.userID = id);
	}
}
