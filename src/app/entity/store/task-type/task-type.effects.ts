import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { taskTypeActionTypes as actionType, taskTypeActions } from '../../action/entities/index';
import { switchMap, map } from 'rxjs/operators';
import { EntityService, ERM } from '~app/shared/entity';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TaskTypeEffects {
	@Effect()
	load$ = this.action$.ofType<any>(actionType.LOAD).pipe(
		switchMap(_ => this.http.get(`api/constants/task-type`)),
		// we receive an array of string, instead we need entities so we can transform those string into entities
		map((result: Array<string>) => result.map(str => ({ id: str, name: str.splitPascalCase() }))),
		map((result: any) => taskTypeActions.add(result))
	);

	constructor(private action$: Actions, private http: HttpClient) {}
}
