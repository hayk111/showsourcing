import { EntityBundle } from '~app/entity/store/entity-bundle';
import { imageActions, imageActionTypes, ImageActions, ImageActionTypes } from './image.action';
import { selectImages, selectImagesAsArray } from './image.selector';

import { imageReducer } from './image.reducer';

export interface ImageBundle extends EntityBundle {
	ActionTypes: ImageActionTypes;
	Actions: ImageActions;
}
export const fromImage: ImageBundle = {
	Actions: imageActions,
	ActionTypes: imageActionTypes,
	reducer: imageReducer,
	selectState: selectImages,
	selectArray: selectImagesAsArray,
};

