import { Currency } from '../model/currency.model';
import { ActionType } from '../action/currency.action';
import { TypedAction } from '../utils/typed-action.interface';

export const initialState: Array<Currency> = [];

export function currencyReducer(state: Array<Currency> = initialState, action: TypedAction<any> ): Array<Currency> {
		switch (action.type) {
			case ActionType.SET_CURRENCY:
				return [...action.payload];
			default: return state;
		}
}
