import { createSelector, OutputSelector } from 'reselect';
import { Project } from '~projects/models/project.model';
import { selectUserTeamId, User } from '~user';
import { entityStateToArray } from '~app/shared/entity';

export const getEntitiesState = state => state.entities;
export const selectProjectsState = createSelector(getEntitiesState, state => state.projects);
export const selectProjects = createSelector(selectProjectsState, state => entityStateToArray(state));

export const selectProjectsProductsCount = createSelector(selectProjectsState, state => state.productsCount);
