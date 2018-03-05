import { createSelector } from 'reselect';
import { ProjectsState } from '~app/features/projects';
import { Project } from '~projects/models/project.model';
import { selectUser, User } from '~user';

import { EntitiesState } from './../reducers';

export const getEntitiesState = state => state.entities;
export const selectProjectsState = createSelector(getEntitiesState, (state: EntitiesState) => state.projects);
export const selectProjects = createSelector(selectProjectsState, (state: ProjectsState) =>
	Object.values(state.byId)
);

export const selectMyProjects = createSelector(
	[selectProjects, selectUser],
	(projects: Array<Project>, user: User) => {
		return Object.values(projects).filter(
			project => project.createdByUserId === 'fb7ff9d3-af48-4e23-a8f2-897dc7ccb9cb'
		);
	}
);
