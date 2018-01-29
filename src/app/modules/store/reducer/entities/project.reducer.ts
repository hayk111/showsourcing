import { TypedAction } from '../../utils/typed-action.interface';
import { Project } from '../../model/entities/project.model';
import { ActionType } from '../../action/entities/project.action';
import { EntityState, addEntities, entityInitialState, copyById, removeId } from '../../utils/entities.utils';


export function projectReducer(state = entityInitialState, action: TypedAction<any> ): EntityState<Project> {
	let id;
	switch (action.type) {

		case ActionType.ADD_PROJECTS:
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
