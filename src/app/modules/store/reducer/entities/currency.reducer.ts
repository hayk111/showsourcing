import { entityInitialState, EntityState, addEntities } from '../../utils/entities.utils';
import { TypedAction } from '../../utils/typed-action.interface';
import { Currency } from '../../model/entities/currency.model';
import { ActionType } from '../../action/entities/currency.action';



export function currencyReducer(state = entityInitialState, action: TypedAction<any> ): EntityState<Currency> {
		switch (action.type) {
			case ActionType.SET_CURRENCY:
				return addEntities(state, action.payload);
			default:
				return state;
		}
}
