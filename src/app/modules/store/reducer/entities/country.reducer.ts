import { Country } from '../../model/entities/country.model';
import { CategoryActionTypes as ActionType } from '../../action/entities/index';
import { TypedAction } from '../../utils/typed-action.interface';
import { addEntities, entityInitialState } from '../../utils/entities.utils';




export function countryReducer(state = entityInitialState, action: TypedAction<any> ) {
		switch (action.type) {
			case ActionType.ADD:
				return addEntities(state, action.payload);
			default: return state;
		}
}
