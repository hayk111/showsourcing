import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from '~app/features/user';
import {
	fromCategory,
	fromCurrency,
	fromCustomField,
	fromEvent,
	fromHarbour,
	fromIncoTerm,
	fromProductStatus,
	fromProject,
	fromSupplier,
	fromSupplierStatus,
	fromTag,
	fromTaskStatus,
	fromTaskType,
	fromTeam,
	fromTeamMember,
} from '~app/entity/store';
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
			fromIncoTerm.Actions.load(),
			fromHarbour.Actions.load(),
			fromTaskType.Actions.load(),
			fromTaskStatus.Actions.load(),
			fromSupplierStatus.Actions.load(),
			fromProductStatus.Actions.load(),
			// user entities
			fromTeam.Actions.load(),
			// team entities
			fromCategory.Actions.load(),
			fromCustomField.Actions.load(),
			fromSupplier.Actions.load(),
			fromEvent.Actions.load(),
			fromProject.Actions.load(),
			fromTag.Actions.load(),
			fromTeamMember.Actions.load(),

			// loading product counts
			fromProject.Actions.loadProductCount(),
			fromEvent.Actions.loadProductCount(),
			fromCategory.Actions.loadProductCount(),
			fromSupplier.Actions.loadProductCount()
		])
	);


}
