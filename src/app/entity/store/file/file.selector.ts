import { createSelector } from 'reselect';
import { entityStateToArray } from '~entity/utils';

export const selectFiles = state => state.entities.files;
export const selectFilesAsArray = createSelector([selectFiles], files => entityStateToArray(files));
