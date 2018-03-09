import { AppImage } from '../models';

import {
	addActionType,
	BasicActions,
	BasicActionTypes,
	ERM,
	makeBasicActions,
	makeBasicActionTypes,
} from '~entity';
import { TypedAction } from '~utils';

// ----------------------------------------------------------------------------
// --------------------------- Constructing basic actions type + extended types
// ----------------------------------------------------------------------------
export interface ImageActionType extends BasicActionTypes {
	ROTATE?: string;
}
export const ImageActionType: ImageActionType = makeBasicActionTypes(ERM.images);
addActionType(ImageActionType, ERM.images, 'ROTATE');

// ----------------------------------------------------------------------------
// --------------------------- Constructing basic actions + extended actions
// ----------------------------------------------------------------------------
export interface ImageActions extends BasicActions {
	rotate?(image: AppImage): TypedAction<AppImage>;
}

export const ImageActions: ImageActions = makeBasicActions(ImageActionType);

// additional actions / extensions of the base
ImageActions.rotate = (image: AppImage) => {
	return {
		type: ImageActionType.ROTATE,
		payload: image,
	};
};
