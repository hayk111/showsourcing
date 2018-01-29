import { Action } from '@ngrx/store';
import { Country } from '../../model/entities/country.model';
import { TypedAction } from '../../utils/typed-action.interface';

export enum ActionType {
	LOAD = '[Country] Loading',
	ADD = '[Country] Adding',
}

export class CountryActions {

	static load() {
		return {
			type: ActionType.LOAD
		};
	}


	static add(payload: Array<Country>): TypedAction<Array<Country>> {
		return {
			type: ActionType.ADD,
			payload
		};
	}
}
