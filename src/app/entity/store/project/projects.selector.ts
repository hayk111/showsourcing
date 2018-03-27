import { createSelector } from 'reselect';
import { entityStateToArray } from '~app/entity/utils';
import { selectEntities } from '~app/entity';

export const selectProjectsState = createSelector(selectEntities, state => state.projects);
export const selectProjects = createSelector(selectProjectsState, state => entityStateToArray(state));
export const selectProjectsProductsCount = createSelector(selectProjectsState, state => state.productsCount);
