import { EntityState, entityInitialState, TypedAction, addEntities, copyById } from '~store';
import { Project } from '../../models';
import { ActionType } from '../actions';

// tslint:disable-next-line:no-empty-interface
export interface ProjectState extends EntityState<Project> {}

export function projectReducer(
	state: EntityState<Project> = entityInitialState,
	action: TypedAction<any>
): ProjectState {
	let id;
	switch (action.type) {
		case ActionType.ADD:
			return addEntities(state, action.payload);

		case ActionType.SET_PENDING:
			return { ...state, pending: true };

		case ActionType.PATCH:
			id = action.payload.id;
			const propName = action.payload.propName;
			const value = action.payload.value;
			return copyById(state, id, { [propName]: value });

		default:
			return state;
	}
}
