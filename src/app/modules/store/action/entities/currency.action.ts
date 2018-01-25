import { Action } from '@ngrx/store';
import { Currency } from '../../model/entities/currency.model';

export enum ActionType {
	LOAD = '[Currency] Loading',
	SET_CURRENCY = '[Currency] setting',
}

export class CurrencyActions {

	static load() {
		return {
			type: ActionType.LOAD
		};
	}

	static setCurrencies(payload: Array<Currency>) {
		return {
			type: ActionType.SET_CURRENCY,
			payload
		};
	}
}
