import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { EntityService } from '~entity/store/entity.service';
import { ERM } from '~entity/store/entity.model';
import { FocussedEntityService } from '~app/entity';
import { HttpClient } from '@angular/common/http';
import { UserService } from '~app/features/user';
import { LatestProductActionType, LatestProductActions } from './latest-product.action';

/** latest products for a supplier */
@Injectable()
export class ProductEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(LatestProductActionType.LOAD)
		.pipe(
			switchMap(_ => this.http.get(
				'api/team/' + this.userSrv.teamId
				+ '/product?take=7&drop=0&sort=creationDate&sortOrder=DESC&supplier='
				+ this.focusSrv.currentTarget.entityId + '&withArchived=false')),
			// getting the array of products from the json
			map((result: any) => result.elements),
			map((result: any) => LatestProductActions.set(result))
		);

	constructor(private action$: Actions, private http: HttpClient, private focusSrv: FocussedEntityService, private userSrv: UserService) { }
}
