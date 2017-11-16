import { Category } from '../model/category.model';
import { ActionType } from '../action/category.action';
import { TypedAction } from '../utils/typed-action.interface';
import { EntityState, addEntities, entityInitialState } from '../utils/entities.utils';


export function categoryReducer(state = entityInitialState, action: TypedAction<Array<Category>> ): EntityState<Category> {
		switch (action.type) {
			case ActionType.ADD_CATEGORIES:
				return addEntities(state, action.payload);
			default:
				return state;
		}
}
