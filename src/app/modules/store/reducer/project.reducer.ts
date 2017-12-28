import { TypedAction } from '../utils/typed-action.interface';
import { Project } from '../model/project.model';
import { ActionType } from '../action/project.action';
import { EntityState, addEntities, entityInitialState } from '../utils/entities.utils';


export function projectReducer(state = entityInitialState, action: TypedAction<any> ): EntityState<Project> {
	switch (action.type) {

		case ActionType.ADD_PROJECTS:
			return addEntities(state, action.payload);

		default: return state;
	}
}
