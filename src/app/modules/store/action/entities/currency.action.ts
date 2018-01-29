import { Action } from '@ngrx/store';
import { TypedAction } from '../../utils/typed-action.interface';
import { Currency } from '../../model/entities/currency.model';

export enum ActionType {
	LOAD = '[Currency] Loading',
	ADD = '[Currency] setting',
}

export class CurrencyActions {

	static load() {
		return {
			type: ActionType.LOAD
		};
	}

	static add(payload: Array<Currency>): TypedAction<Array<Currency>> {
		return {
			type: ActionType.ADD,
			payload
		};
	}
}
