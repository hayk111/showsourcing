import { AppImage } from './image.model';

import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM } from '../entity.model';
import { TypedAction } from '~utils';

const entityName = ERM.image.entityName;

export interface ImageActionTypes extends EntityActionTypes {
	ROTATE: string;

}

export const imageActionTypes = {
	...makeEntityActionTypes(entityName),
	ROTATE: `[${entityName.capitalize()}] Rotating...`
};

// ----------------------------------------------------------------------------
// --------------------------- Constructing basic actions + extended actions
// ----------------------------------------------------------------------------
export class ImageActions extends EntityActions<ImageActionTypes> {
	rotate(image: AppImage) {
		return {
			type: this.actionType.ROTATE,
			payload: image,
		};
	}
}

export const imageActions = new ImageActions(imageActionTypes);
