import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { EntityService } from '~entity/store/entity.service';
import { ERM, EntityTarget } from '~entity/store/entity.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from '~app/features/user';
import { LatestProductActionType, LatestProductActions } from './latest-product.action';
import { FocusedEntityService } from '~app/shared/focused-entity/focused-entity.service';

/** latest products for a supplier */
@Injectable()
export class ProductEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(LatestProductActionType.LOAD)
		.pipe(
			map(_ => this.focusSrv.target),
			switchMap((target: EntityTarget) => this.http.get(
				'api/team/' + this.userSrv.teamId
				+ '/product?take=7&drop=0&sort=creationDate&sortOrder=DESC&supplier='
				+ target.entityId + '&withArchived=false')),
			// getting the array of products from the json
			map((result: any) => result.elements),
			map((result: any) => LatestProductActions.set(result))
		);

	constructor(
		private action$: Actions,
		private http: HttpClient,
		private userSrv: UserService,
		private focusSrv: FocusedEntityService) { }
}
