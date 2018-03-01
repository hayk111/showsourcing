
// we only need arrays here
import { entityStateToArray } from '~entity';
import { createSelector } from 'reselect';

export const selectFilesForCurrentTarget = state => state.foccussedEntity.files;
export const selectFilesArrayForCurrentTarget = createSelector([selectFilesForCurrentTarget], filesState => {
  return entityStateToArray(filesState);
});
