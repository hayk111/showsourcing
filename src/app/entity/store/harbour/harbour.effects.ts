import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { fromHarbour } from './harbour.bundle';
import { switchMap, map } from 'rxjs/operators';
import { EntityService } from '~app/entity/store/entity.service';
import { ERM } from '~app/entity/store/entity.model';

@Injectable()
export class HarbourEffects {
	@Effect()
	load$ = this.action$.ofType<any>(fromHarbour.ActionTypes.LOAD).pipe(
		switchMap(_ => this.srv.load({ target: ERM.harbour })),
		// we receive an array of string, instead we need entities so we can transform those string into entities
		map((result: Array<string>) => result.map(str => ({ id: str, name: str }))),
		map((result: any) => fromHarbour.Actions.add(result))
	);

	constructor(private action$: Actions, private srv: EntityService) { }
}
