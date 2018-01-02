import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { ActionType, CustomFieldsActions } from '../action/custom-fields.action';
import { map, switchMap, tap } from 'rxjs/operators';
import { TypedAction } from '../utils/typed-action.interface';
import { CustomFieldsService } from '../services/custom-fields.service';
import { EntityTarget, entityRepresentationMap } from '../utils/entities.utils';
import { ProductActions } from '../action/product.action';


@Injectable()
export class CustomFieldsEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap(({id, maxCounter}) => this.srv.load(id, maxCounter)),
		map((result: any) => CustomFieldsActions.set(result))
	);

	// Listen for the patch action and sends a patch request to backend
	@Effect({ dispatch: false })
	patch$ = this.actions$.ofType(ActionType.PATCH).pipe(
		map((action: TypedAction<any>) => action.payload),
		switchMap(p => this.srv.sendPatchRequest(p)),
		// map(p => this.mapPatch(p))
	);

	mapPatch({target, propName, value}: { target: EntityTarget, propName: string, value: any }) {
		const m = entityRepresentationMap;
		switch (target.entityRepr.entityName) {
			case m.product.entityName :
				return ProductActions.patch(target.entityId, propName, value);
		}
	}

	constructor(private actions$: Actions, private srv: CustomFieldsService) {}
}
