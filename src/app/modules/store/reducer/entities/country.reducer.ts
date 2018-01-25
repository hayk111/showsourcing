import { Country } from '../../model/entities/country.model';
import { TypedAction } from '../../utils/typed-action.interface';
import { ActionType } from '../../action/entities/country.action';





export const initialState: Array<Country> = [];

export function countryReducer(state: Array<Country> = initialState, action: TypedAction<any> ): Array<Country> {
		switch (action.type) {
			case ActionType.SET_COUNTRIES:
				return [...action.payload];
			default: return state;
		}
}
