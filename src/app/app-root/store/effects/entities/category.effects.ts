import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { CategoryActionTypes as ActionType, CategoryActions } from '../../action/entities/index';
import { CategoryService } from '../../services/category.service';


@Injectable()
export class CategoryEffects {

	@Effect()
	load$ = this.action$.ofType<any>(ActionType.LOAD).pipe(
		switchMap(_ => this.srv.load()),
		map((result: any) =>  CategoryActions.add(result))
	);

	constructor( private action$: Actions, private srv: CategoryService) {}
}
