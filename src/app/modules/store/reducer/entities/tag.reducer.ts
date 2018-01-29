import { TypedAction } from '../../utils/typed-action.interface';
import { ActionType } from '../../action/entities/tag.action';
import { Tag } from '../../model/entities/tag.model';
import { EntityState, entityInitialState, addEntities, copyById, removeId } from '../../utils/entities.utils';


export function tagReducer(state = entityInitialState, action: TypedAction<any> ): EntityState<Tag> {
	let id;
	switch (action.type) {

		case ActionType.ADD_TAGS:
			return addEntities(state, action.payload);

		case ActionType.PATCH:
			id = action.payload.id;
			const propName = action.payload.propName;
			const value = action.payload.value;
			return copyById(state, id, { [propName]: value } );

		case ActionType.DELETE:
			id = action.payload;
			return removeId(state, id);

		default: return state;
	}
}
