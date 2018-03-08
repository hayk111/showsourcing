import { createSelector } from 'reselect';
import { entityStateToArray } from '~app/app-root/store';

export const selectFiles = state => state.entities.files;
export const selectFilesAsArray = createSelector([selectFiles], files =>
	entityStateToArray(files)
);
