import { AppImage } from './image.model';

import { makeEntityActionTypes, EntityActions, EntityActionTypes } from '../entity.action.factory';
import { ERM, EntityTarget } from '../entity.model';
import { TypedAction } from '~utils';

const entityName = ERM.image.entityName;

export interface ImageActionTypes extends EntityActionTypes {
	ROTATE: string;
	ADD_ONE: string;
	LINK: string;

}

export const imageActionTypes = {
	...makeEntityActionTypes(entityName),
	ROTATE: `[${entityName.capitalize()}] Rotating...`,
	ADD_ONE: `[${entityName.capitalize()}] Adding one`,
	LINK: `[${entityName.capitalize()}] Linking`
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

	addOne(file: AppImage) {
		return {
			type: this.actionType.ADD_ONE,
			payload: file
		};
	}

	link(target: EntityTarget, file: AppImage) {
		return {
			type: this.actionType.LINK,
			payload: { target, file }
		};
	}
}

export const imageActions = new ImageActions(imageActionTypes);
