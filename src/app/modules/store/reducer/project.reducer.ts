import { TypedAction } from '../utils/typed-action.interface';
import { Project } from '../model/project.model';
import { ActionType } from '../action/project.action';
import { EntityState, addEntities, entityInitialState, copyById } from '../utils/entities.utils';


export function projectReducer(state = entityInitialState, action: TypedAction<any> ): EntityState<Project> {
	switch (action.type) {

		case ActionType.ADD_PROJECTS:
			return addEntities(state, action.payload);

		case ActionType.PATCH:
			const id = action.payload.id;
			const propName = action.payload.propName;
			const value = action.payload.value;
			return copyById(state, id, { [propName]: value } );

		default: return state;
	}
}
