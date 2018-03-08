import { createSelector } from 'reselect';
import { entityStateToArray } from '~app/app-root/store';

export const selectImages = state => state.entities.images;
export const selectImagesAsArray = createSelector([selectImages], imgs =>
	entityStateToArray(imgs)
);
