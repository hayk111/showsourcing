import { Currency } from '../../model/entities/currency.model';
import { ActionType } from '../../action/entities/currency.action';
import { TypedAction } from '../../utils/typed-action.interface';
import { addEntities, EntityState, entityInitialState } from '../../utils/entities.utils';


export function currencyReducer(state = entityInitialState, action: TypedAction<any> ): EntityState<Currency> {
		switch (action.type) {
			case ActionType.SET_CURRENCY:
				return addEntities(state, action.payload);
			default:
				return state;
		}
}
