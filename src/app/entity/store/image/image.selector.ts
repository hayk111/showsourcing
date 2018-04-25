import { createSelector } from '@ngrx/store';
import { entityStateToArray } from '~entity/utils';

export const selectImages = state => state.entities.image;
export const selectImagesAsArray = createSelector([selectImages], imgs => entityStateToArray(imgs));
