import { ExtendedEntityState } from '~entity';
import { extentedEntityInitialState } from '~entity/models/entities.model';
import { Project } from '~projects/models/project.model';
import { basicReducerFactory } from '~store';

import { ProjectsActionType } from '../actions';

export interface EntitiesState {
	projects: ProjectsState;
}
export interface ProjectsState extends ExtendedEntityState<Project> {}

export const projectReducer = basicReducerFactory(
	ProjectsActionType,
	extentedEntityInitialState
);
