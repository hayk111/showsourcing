import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from '~app/features/user';
import {
	fromCategory,
	fromCurrency,
	fromCustomField,
	eventActions,
	harbourActions,
	incoTermsActions,
	productStatusActions,
	projectActions,
	supplierActions,
	supplierStatusActions,
	tagActions,
	taskStatusActions,
	taskTypeActions,
	teamActions,
	teamMembersActions,
} from '~entity/store';
import { take, mergeMap } from 'rxjs/operators';
import { Effect, Actions } from '@ngrx/effects';
import { ActionType } from './preloader.action';
import { fromCountry } from '~app/entity/store/country/country.bundle';


@Injectable()
export class PreloaderEffects {
	constructor(private actions$: Actions) { }

	@Effect()
	preload$ = this.actions$.ofType<any>(ActionType.PRELOAD).pipe(
		mergeMap(_ => [
			// static entities
			fromCountry.Actions.load(),
			fromCurrency.Actions.load(),
			incoTermsActions.load(),
			harbourActions.load(),
			taskTypeActions.load(),
			taskStatusActions.load(),
			supplierStatusActions.load(),
			productStatusActions.load(),
			// user entities
			teamActions.load(),
			// team entities
			fromCategory.Actions.load(),
			fromCustomField.Actions.load(),
			supplierActions.load(),
			eventActions.load(),
			projectActions.load(),
			tagActions.load(),
			teamMembersActions.load(),
		])
	);


}
