import { createSelector } from 'reselect';
import { EntityTarget } from '../utils/entities.utils';


export const selectFiles = state => state.entities.files;

export const selectFilesForTarget = (target: EntityTarget) => {
	return createSelector([selectFiles], files => {
		return files.filter(f => f.target.entityId === target.entityId);
	});
};

