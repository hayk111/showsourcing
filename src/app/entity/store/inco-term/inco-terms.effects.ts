import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { EntityService } from '~app/entity/store/entity.service';
import { ERM } from '~app/entity/store/entity.model';
import { fromIncoTerm } from './inco-term.bundle';

@Injectable()
export class IncoTermsEffects {
	@Effect()
	load$ = this.action$.ofType<any>(fromIncoTerm.ActionTypes.LOAD).pipe(
		switchMap(_ => this.srv.load({ target: ERM.incoTerm })),
		// we receive an array of string, instead we need entities so we can transform those string into entities
		map((result: Array<string>) => result.map(str => ({ id: str, name: str }))),
		map((result: any) => fromIncoTerm.Actions.add(result))
	);

	constructor(private action$: Actions, private srv: EntityService) { }
}
