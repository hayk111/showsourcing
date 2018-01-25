import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { EntityTarget, entityRepresentationMap } from '../../utils/entities.utils';
import { TypedAction } from '../../utils/typed-action.interface';
import { CustomFieldsActions, ActionType } from '../../action/entities/custom-fields.action';
import { ProductActions } from '../../action/entities/product.action';
import { CustomFieldsService } from '../../services/custom-fields.service';


@Injectable()
export class CustomFieldsEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap(({id, maxCounter}) => this.srv.load(id, maxCounter)),
		map((result: any) => CustomFieldsActions.set(result))
	);

	// Listen for the patch action and sends a patch request to backend
	@Effect()
	patch$ = this.actions$.ofType(ActionType.PATCH).pipe(
		map((action: TypedAction<any>) => action.payload),
		map((p: any) => this.mapPatch(p))
	);

	mapPatch({target, propName, value}: { target: EntityTarget, propName: string, value: any }) {
		const m = entityRepresentationMap;
		switch (target.entityRepr.entityName) {
			case m.product.entityName :
				return ProductActions.patch(target.entityId, propName, value);
		}
	}

	constructor(private actions$: Actions, private srv: CustomFieldsService, private store: Store<any>) {}
}
