import { createSelector } from 'reselect';
import { EntityTarget } from '../../utils/entities.utils';


export const selectImages = state => state.entities.images;

export const selectImagesForTarget = (target: EntityTarget) => {
	return createSelector([selectImages], images => {
		return images.filter(f => f.target.entityId === target.entityId);
	});
};

