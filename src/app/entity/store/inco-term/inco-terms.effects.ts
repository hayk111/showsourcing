import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { EntityService } from '~entity/store/entity.service';
import { ERM } from '~entity/store/entity.model';
import { incoTermsActionTypes as actionType, incoTermsActions } from './inco-term.action';

@Injectable()
export class IncoTermsEffects {
	@Effect()
	load$ = this.action$.ofType<any>(actionType.LOAD).pipe(
		switchMap(_ => this.srv.load({ target: ERM.incoTerms })),
		// we receive an array of string, instead we need entities so we can transform those string into entities
		map((result: Array<string>) => result.map(str => ({ id: str, name: str }))),
		map((result: any) => incoTermsActions.add(result))
	);

	constructor(private action$: Actions, private srv: EntityService) { }
}
