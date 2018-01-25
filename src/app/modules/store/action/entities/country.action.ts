import { Action } from '@ngrx/store';
import { Country } from '../../model/entities/country.model';
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


	static setCountries(payload: Array<Country>) {
		return {
			type: ActionType.SET_COUNTRIES,
			payload
		};
	}
}
