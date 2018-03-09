import { createSelector } from 'reselect';
import { ProjectsState } from '~app/features/projects';
import { Project } from '~projects/models/project.model';
import { selectUserTeamId, User } from '~user';

import { EntitiesState } from './project.reducer';

export const getEntitiesState = state => state.entities;
export const selectProjectsState = createSelector(
	getEntitiesState,
	(state: EntitiesState) => state.projects
);
export const selectProjects = createSelector(selectProjectsState, (state: ProjectsState) =>
	Object.values(state.byId)
);

export const selectProjectsProductsCount = createSelector(
	selectProjectsState,
	(state: ProjectsState) => {
		return state.productsCount;
	}
);
