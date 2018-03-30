import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { harbourActionTypes as ActionType, harbourActions } from './harbour.action';
import { switchMap, map } from 'rxjs/operators';
import { EntityService } from '~entity/store/entity.service';
import { ERM } from '~entity/store/entity.model';

@Injectable()
export class HarbourEffects {
	@Effect()
	load$ = this.action$.ofType<any>(ActionType.LOAD).pipe(
		switchMap(_ => this.srv.load({ target: ERM.harbour })),
		// we receive an array of string, instead we need entities so we can transform those string into entities
		map((result: Array<string>) => result.map(str => ({ id: str, name: str }))),
		map((result: any) => harbourActions.add(result))
	);

	constructor(private action$: Actions, private srv: EntityService) { }
}
