import { Action } from '@ngrx/store';
import { TypedAction } from '../utils/typed-action.interface';
import { Currency } from '../model/currency.model';

export enum ActionType {
	SET_CURRENCY = '[Currency] setting',
}

export class CurrencyActions {
		static setCurrencies(payload: Array<Currency>): TypedAction<Array<Currency>> {
				return {
						type: ActionType.SET_CURRENCY,
						payload
				};
		}
}
