import { createSelector } from 'reselect';
import { entityStateToArray } from '~entity/utils';

export const selectImages = state => state.entities.images;
export const selectImagesAsArray = createSelector([selectImages], imgs => entityStateToArray(imgs));
