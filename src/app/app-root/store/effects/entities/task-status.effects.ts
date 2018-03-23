import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { taskStatusActionTypes as actionType, taskStatusActions } from '../../action/entities/index';
import { switchMap, map } from 'rxjs/operators';
import { EntityService, ERM } from '~app/shared/entity';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TaskStatusEffects {
	@Effect()
	load$ = this.action$.ofType<any>(actionType.LOAD).pipe(
		switchMap(_ => this.http.get(`api/constants/task-status`)),
		// we receive an array of string, instead we need entities so we can transform those string into entities
		map((result: Array<string>) => result.map(str => ({ id: str, name: str }))),
		map((result: any) => taskStatusActions.add(result))
	);

	constructor(private action$: Actions, private http: HttpClient) {}
}
