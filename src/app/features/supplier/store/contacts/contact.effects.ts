import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { fromSupplierContact } from './contact.bundle';
import { switchMap, map, tap } from 'rxjs/operators';
import { EntityService } from '~entity/store/entity.service';
import { ERM } from '~entity/store/entity.model';
import { FocussedEntityService } from '~app/entity/store/focussed-entity';
import { HttpClient } from '@angular/common/http';
import { ImageHttpService } from '~app/entity/store/image/image-http.service';
import { Swap } from '~app/entity/utils';

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

	@Effect()
	createImg$ = this.action$
		.ofType<any>(fromSupplierContact.ActionTypes.CREATE_IMG)
		.pipe(
			map(action => action.payload),
			// we can use switchMap since a new upload should cancel the previous one. I think.
			switchMap(file => this.imageHttp.uploadFile(file).pipe(
				map(r => fromSupplierContact.Actions.setPreview(r))
			))
		);

	constructor(
		private action$: Actions,
		private http: HttpClient,
		private focusSrv: FocussedEntityService,
		private imageHttp: ImageHttpService) { }
}
