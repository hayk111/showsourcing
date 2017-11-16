import { Action } from '@ngrx/store';
import { Country } from '../model/country.model';
import { TypedAction } from '../utils/typed-action.interface';

export enum ActionType {
		SET_COUNTRIES = '[Country] setting',
}

export class CountryActions {
		static setCountries(payload: Array<Country>): TypedAction<Array<Country>> {
				return {
						type: ActionType.SET_COUNTRIES,
						payload
				};
		}
}
