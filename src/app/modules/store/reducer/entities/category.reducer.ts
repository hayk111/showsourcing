import { addEntities, EntityState, entityInitialState } from '../../utils/entities.utils';
import { TypedAction } from '../../utils/typed-action.interface';
import { Category } from '../../model/entities/category.model';
import { ActionType } from '../../action/entities/category.action';



export function categoryReducer(state = entityInitialState, action: TypedAction<Array<Category>> ): EntityState<Category> {
		switch (action.type) {
			case ActionType.ADD_CATEGORIES:
				return addEntities(state, action.payload);
			default:
				return state;
		}
}
