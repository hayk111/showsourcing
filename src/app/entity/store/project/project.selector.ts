import { createSelector } from 'reselect';
import { entityStateToArray } from '~app/entity/utils';
import { selectEntities } from '~entity/store/entity.selector';

export const selectProjectsState = createSelector(selectEntities, state => state.project);
export const selectProjects = createSelector(selectProjectsState, state => entityStateToArray(state));
export const selectProjectsProductsCount = createSelector(selectProjectsState, state => state.productsCount);
