import { TypedAction } from '../utils/typed-action.interface';
import { ActionType } from '../action/tag.action';
import { Tag } from '../model/tag.model';
import { EntityState, entityInitialState, addEntities } from '../utils/entities.utils';


export function tagReducer(state = entityInitialState, action: TypedAction<any> ): EntityState<Tag> {
	switch (action.type) {

		case ActionType.ADD_TAGS:
			return addEntities(state, action.payload);

		default: return state;
	}
}
