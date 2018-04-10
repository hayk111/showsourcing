import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { fromSupplierContact } from './contact.bundle';
import { switchMap, map } from 'rxjs/operators';
import { EntityService } from '~entity/store/entity.service';
import { ERM } from '~entity/store/entity.model';
import { FocussedEntityService, Swap } from '~app/entity';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContactEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(fromSupplierContact.ActionTypes.LOAD_FOR_SELECTION)
		.pipe(
			switchMap(_ => this.http.get(`api/supplier/${this.focusSrv.currentTarget.entityId}/contact`)),
			map((result: any) => result.elements),
			map((result: any) => fromSupplierContact.Actions.add(result))
		);

	@Effect()
	create$ = this.action$
		.ofType<any>(fromSupplierContact.ActionTypes.CREATE)
		.pipe(
			map(action => action.payload),
			switchMap(
				contact => this.http.post(`api/supplier/${this.focusSrv.currentTarget.entityId}/contact`, contact),
				(old, replacing) => fromSupplierContact.Actions.replace([new Swap(old, <any>replacing)])
			)
		);

	constructor(private action$: Actions, private http: HttpClient, private focusSrv: FocussedEntityService) { }
}
