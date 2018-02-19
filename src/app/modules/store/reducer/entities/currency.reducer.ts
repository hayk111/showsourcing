import { Currency } from '../../model/entities/currency.model';
import { CurrencyActionTypes as ActionType } from '../../action/entities/index';
import { TypedAction } from '../../utils/typed-action.interface';
import { addEntities, EntityState, entityInitialState } from '../../utils/entities.utils';


export function currencyReducer(state = entityInitialState, action: TypedAction<any> ): EntityState<Currency> {
		switch (action.type) {
			case ActionType.ADD:
				return addEntities(state, action.payload);
			default:
				return state;
		}
}
