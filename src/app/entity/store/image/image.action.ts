import { AppImage } from './image.model';

import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM } from '../entity.model';
import { TypedAction } from '~utils';

export const imageActionTypes = {
	...makeEntityActionTypes(ERM.image),
	ROTATE: `[${ERM.image.entityName.capitalize()}] Rotating...`,
	SET_PRODUCT_COUNT: `[${ERM.image.entityName.capitalize()}] Setting product count...`,
	ADD_PRODUCTS: `[${ERM.image.entityName.capitalize()}] Adding Product to project...`,
	ADD_PRODUCTS_SUCCESS: `[${ERM.image.entityName.capitalize()}] Successfully adding product to project...`,
};

// ----------------------------------------------------------------------------
// --------------------------- Constructing basic actions + extended actions
// ----------------------------------------------------------------------------
class ImageActions extends EntityActions {
	rotate(image: AppImage) {
		return {
			type: this.actionType.ROTATE,
			payload: image,
		};
	}
}

export const imageActions = new ImageActions(imageActionTypes);
