import { Category } from '../../model/entities/category.model';
import { ActionType } from '../../action/entities/category.action';
import { TypedAction } from '../../utils/typed-action.interface';
import { EntityState, addEntities, entityInitialState, copyById, removeEntity } from '../../utils/entities.utils';


export function categoryReducer(state = entityInitialState, action: TypedAction<any> ): EntityState<Category> {
	let id;
		switch (action.type) {
			case ActionType.ADD:
				return addEntities(state, action.payload);

			case ActionType.PATCH:
				id = action.payload.id;
				const propName = action.payload.propName;
				const value = action.payload.value;
				return copyById(state, id, { [propName]: value } );

			case ActionType.DELETE:
				id = action.payload;
				return removeEntity(state, id);


			default:
				return state;
		}
}
