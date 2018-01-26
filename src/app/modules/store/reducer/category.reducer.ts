import { Category } from '../model/category.model';
import { ActionType } from '../action/category.action';
import { TypedAction } from '../utils/typed-action.interface';
import { EntityState, addEntities, entityInitialState, copyById } from '../utils/entities.utils';


export function categoryReducer(state = entityInitialState, action: TypedAction<any> ): EntityState<Category> {
		switch (action.type) {
			case ActionType.ADD_CATEGORIES:
				return addEntities(state, action.payload);

			case ActionType.PATCH:
				debugger;
				const id = action.payload.id;
				const propName = action.payload.propName;
				const value = action.payload.value;
				return copyById(state, id, { [propName]: value } );
			default:
				return state;
		}
}
