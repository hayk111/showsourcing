
// we only need arrays here
import { entityStateToArray } from '~store/utils/entities.utils';
import { createSelector } from 'reselect';

export const selectFilesForCurrentTarget = state => state.foccussedEntity.files;
export const selectFilesArrayForCurrentTarget = createSelector([selectFilesForCurrentTarget], filesState => {
  return entityStateToArray(filesState);
});
