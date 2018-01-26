import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, tap } from 'rxjs/operators';
import { ActionType, CategoryActions } from '../../action/entities/category.action';
import { CategoryService } from '../../services/category.service';


@Injectable()
export class CategoryEffects {

	@Effect()
	load$ = this.action$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap(({id, maxCounter}) => this.srv.load(id, maxCounter)),
		map((result: any) =>  CategoryActions.addCategories(result))
	);

	constructor( private action$: Actions, private srv: CategoryService) {}
}
