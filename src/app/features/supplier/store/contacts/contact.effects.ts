import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, tap, mergeMap } from 'rxjs/operators';
import { EntityService } from '~entity/store/entity.service';
import { ERM, EntityTarget } from '~entity/store/entity.model';
import { HttpClient } from '@angular/common/http';
import { ImageHttpService } from '~app/entity/store/image/image-http.service';
import { Patch } from '~app/entity/utils';
import { ContactActionType, ContactActions } from './contact.actions';
import { Contact } from '~app/features/supplier/store/contacts/contact.model';
import { FocusedEntityService } from '~app/shared/focused-entity/focused-entity.service';

@Injectable()
export class ContactEffects {

	@Effect()
	load$ = this.action$
		.ofType<any>(ContactActionType.LOAD)
		.pipe(
			map(_ => this.focusSrv.target.entityId),
			switchMap((target: EntityTarget) => this.http.get(`api/supplier/${target}/contact`)),
			map((result: any) => result.elements),
			map((result: any) => ContactActions.set(result))
		);

	@Effect()
	create$ = this.action$
		.ofType<any>(ContactActionType.CREATE)
		.pipe(
			map(action => action.payload),
			mergeMap((contact: Contact) => this.http.post(`api/supplier/${this.focusSrv.target.entityId}/contact`, contact)),
			map((newContact: Contact) => ContactActions.replace([newContact]))
		);

	@Effect()
	createImg$ = this.action$
		.ofType<any>(ContactActionType.CREATE_IMG)
		.pipe(
			map(action => action.payload),
			// we can use switchMap since a new upload should cancel the previous one. I think.
			switchMap(file => this.imageHttp.uploadFile(file).pipe(
				map(r => ContactActions.setPreview(r))
			))
		);

	@Effect()
	changeImg$ = this.action$
		.ofType<any>(ContactActionType.CHANGE_IMG)
		.pipe(
			map(action => action.payload),
			// we can use switchMap since a new upload should cancel the previous one. I think.
			switchMap(({ img, contactId }) => this.imageHttp.uploadFile(img).pipe(
				mergeMap(r => [
					// we patch the image id so it's patched on the server
					ContactActions.patch({ id: contactId, propName: 'imageId', value: r.id }),
					// we patch img so it's reflected in the view
					ContactActions.patch({ id: contactId, propName: 'image', value: r })
				])
			))
		);

	@Effect({ dispatch: false })
	patch$ = this.action$
		.ofType<any>(ContactActionType.PATCH)
		.pipe(
			map(action => action.payload),
			mergeMap((patch: Patch) => this.http.patch(`api/contact/${patch.id}`, { [patch.propName]: patch.value }))
		);

	constructor(
		private action$: Actions,
		private http: HttpClient,
		private imageHttp: ImageHttpService,
		private focusSrv: FocusedEntityService) { }
}
