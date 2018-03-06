import { TypedAction } from '~utils';
import { ExtendedEntityState } from '~entity';
import { extentedEntityInitialState } from '~entity/models/entities.model';
import { Project } from '~projects/models/project.model';
import { basicReducerFactory } from '~store';

import { ProjectsActionTypes } from '../actions';

export interface EntitiesState {
	projects: ProjectsState;
}
export interface ProjectsState extends ExtendedEntityState<Project> {}

const basicProjectsReducer = basicReducerFactory(
	ProjectsActionTypes,
	extentedEntityInitialState
);

export function projectsReducer(
	state = extentedEntityInitialState,
	action: TypedAction<any>
) {
	switch (action.type) {
		case ProjectsActionTypes.SET_PRODUCT_COUNT:
			return { ...state, productsCount: action.payload };
		default:
			return basicProjectsReducer(state, action);
	}
}
