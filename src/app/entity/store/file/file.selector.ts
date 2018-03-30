import { createSelector } from 'reselect';
import { entityStateToArray } from '~entity/utils';

export const selectFiles = state => state.entities.file;
export const selectFilesAsArray = createSelector([selectFiles], file => entityStateToArray(file));
