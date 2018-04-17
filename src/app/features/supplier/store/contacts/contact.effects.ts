import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { fromSupplierContact } from './contact.bundle';
import { switchMap, map, tap, mergeMap } from 'rxjs/operators';
import { EntityService } from '~entity/store/entity.service';
import { ERM } from '~entity/store/entity.model';
import { FocussedEntityService } from '~app/entity/store/focussed-entity';
import { HttpClient } from '@angular/common/http';
import { ImageHttpService } from '~app/entity/store/image/image-http.service';
import { Swap, Patch } from '~app/entity/utils';

@Injectable()
export class ContactEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(fromSupplierContact.ActionTypes.LOAD_FOR_SELECTION)
		.pipe(
			switchMap(_ => this.http.get(`api/supplier/${this.focusSrv.currentTarget.entityId}/contact`)),
			map((result: any) => result.elements),
			map((result: any) => fromSupplierContact.Actions.set(result))
		);

	@Effect()
	create$ = this.action$
		.ofType<any>(fromSupplierContact.ActionTypes.CREATE)
		.pipe(
			map(action => action.payload),
			mergeMap(
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

	@Effect()
	changeImg$ = this.action$
		.ofType<any>(fromSupplierContact.ActionTypes.CHANGE_IMG)
		.pipe(
			map(action => action.payload),
			// we can use switchMap since a new upload should cancel the previous one. I think.
			switchMap(({ img, contactId }) => this.imageHttp.uploadFile(img).pipe(
				mergeMap(r => [
					// we patch the image id so it's patched on the server
					fromSupplierContact.Actions.patch({ id: contactId, propName: 'imageId', value: img.id }),
					// we patch img so it's reflected in the view
					fromSupplierContact.Actions.patch({ id: contactId, propName: 'image', value: img })
				])
			))
		);

	@Effect({ dispatch: false })
	patch$ = this.action$
		.ofType<any>(fromSupplierContact.ActionTypes.PATCH)
		.pipe(
			map(action => action.payload),
			mergeMap((patch: Patch) => this.http.patch(`api/contact/${patch.id}`, { [patch.propName]: patch.value }))
		);

	constructor(
		private action$: Actions,
		private http: HttpClient,
		private focusSrv: FocussedEntityService,
		private imageHttp: ImageHttpService) { }
}
