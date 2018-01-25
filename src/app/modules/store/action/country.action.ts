import { Action } from '@ngrx/store';
import { Country } from '../model/country.model';
import { TypedAction } from '../utils/typed-action.interface';

export enum ActionType {
	LOAD = '[Country] Loading',
	SET_COUNTRIES = '[Country] Setting',
}

export class CountryActions {

	static load() {
		return {
			type: ActionType.LOAD
		};
	}


	static setCountries(payload: Array<Country>): TypedAction<Array<Country>> {
		return {
			type: ActionType.SET_COUNTRIES,
			payload
		};
	}
}
