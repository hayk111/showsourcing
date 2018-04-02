import { AppImage } from './image.model';

import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM } from '../entity.model';
import { TypedAction } from '~utils';

const entityName = ERM.image.entityName;

export const imageActionTypes = {
	...makeEntityActionTypes(entityName),
	ROTATE: `[${entityName.capitalize()}] Rotating...`,
	SET_PRODUCT_COUNT: `[${entityName.capitalize()}] Setting product count...`,
	ADD_PRODUCTS: `[${entityName.capitalize()}] Adding Product to project...`,
	ADD_PRODUCTS_SUCCESS: `[${entityName.capitalize()}] Successfully adding product to project...`,
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
