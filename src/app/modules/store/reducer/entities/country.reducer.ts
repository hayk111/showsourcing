import { Country } from '../../model/entities/country.model';
import { ActionType } from '../../action/entities/country.action';
import { TypedAction } from '../../utils/typed-action.interface';



export const initialState: Array<Country> = [];

export function countryReducer(state: Array<Country> = initialState, action: TypedAction<any> ): Array<Country> {
		switch (action.type) {
			case ActionType.SET_COUNTRIES:
				return [...action.payload];
			default: return state;
		}
}
