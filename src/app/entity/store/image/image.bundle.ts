import { EntityBundle } from '~app/entity/store/entity-bundle';
import { imageActions, imageActionTypes } from './image.action';
import { selectImages, selectImagesAsArray } from './image.selector';

import { imageReducer } from './image.reducer';

export const fromImage: EntityBundle = {
	Actions: imageActions,
	ActionTypes: imageActionTypes,
	reducer: imageReducer,
	selectState: selectImages,
	selectArray: selectImagesAsArray,
};

