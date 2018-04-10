import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { fromSupplierProduct } from './product.bundle';
import { switchMap, map } from 'rxjs/operators';
import { EntityService } from '~entity/store/entity.service';
import { ERM } from '~entity/store/entity.model';
import { FocussedEntityService } from '~app/entity';
import { HttpClient } from '@angular/common/http';
import { UserService } from '~app/features/user';

/** latest products for a supplier */
@Injectable()
export class ProductEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(fromSupplierProduct.ActionTypes.LOAD_FOR_SELECTION)
		.pipe(
			switchMap(_ => this.http.get(
				// tslint:disable-next-line:max-line-length
				`api/team/${this.userSrv.teamId}/product?take=30&sort=creationDate&sortOrder=DESC&supplier=${this.focusSrv.currentTarget.entityId}&withArchived=false`)),
			map((result: any) => result.elements),
			map((result: any) => fromSupplierProduct.Actions.add(result))
		);

	constructor(private action$: Actions, private http: HttpClient, private focusSrv: FocussedEntityService, private userSrv: UserService) { }
}
