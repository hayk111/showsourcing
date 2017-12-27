import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { ActionType } from '../action/custom-fields.action';
import { map, switchMap, tap } from 'rxjs/operators';
import { TypedAction } from '../utils/typed-action.interface';
import { CustomFieldsService } from '../services/custom-fields.service';
import { EntityTarget, entityRepresentationMap } from '../utils/entities.utils';
import { ProductActions } from '../action/product.action';


@Injectable()
export class CustomFieldsEffects {


	// Listen for the patch action and sends a patch request to backend
	@Effect()
	patch$ = this.actions$.ofType(ActionType.PATCH).pipe(
		map((action: TypedAction<any>) => action.payload),
		tap(p => this.srv.sendPatchRequest(p)),
		map(p => this.mapPatch(p))
	);

	mapPatch({target, propName, value}: { target: EntityTarget, propName: string, value: any }){
		const m = entityRepresentationMap;
		switch (target.entityRepr.entityName) {
			case m.product.entityName :
				return ProductActions.patch(target.entityId, propName, value);
		}
	}

	constructor(private actions$: Actions, private srv: CustomFieldsService) {}
}
