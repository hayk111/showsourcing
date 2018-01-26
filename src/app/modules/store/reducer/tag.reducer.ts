import { TypedAction } from '../utils/typed-action.interface';
import { ActionType } from '../action/tag.action';
import { Tag } from '../model/tag.model';
import { EntityState, entityInitialState, addEntities, copyById } from '../utils/entities.utils';


export function tagReducer(state = entityInitialState, action: TypedAction<any> ): EntityState<Tag> {
	switch (action.type) {

		case ActionType.ADD_TAGS:
			return addEntities(state, action.payload);

		case ActionType.PATCH:
			const id = action.payload.id;
			const propName = action.payload.propName;
			const value = action.payload.value;
			return copyById(state, id, { [propName]: value } );

		default: return state;
	}
}
