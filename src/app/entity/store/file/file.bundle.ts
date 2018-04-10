import { makeEntityBundle, EntityBundle, createEntitySelectors, EntitySelectors } from '~app/entity/store/entity-bundle';
import { ERM, entityInitialState, EntityTarget } from '~app/entity/store/entity.model';
import {
	EntityActions, makeEntityActionTypes,
	EntityActionTypes
} from '~app/entity/store/entity.action.factory';

import { entityReducerFactory } from '~app/entity/store/entity.reducer.factory';
import { AppFile } from './file.model';

const entityName = ERM.file.entityName;

interface FileActionType extends EntityActionTypes {
	ADD_ONE: string;
	LINK: string;
}
const fileActionTypes: FileActionType = {
	...makeEntityActionTypes(entityName),
	ADD_ONE: '[File]: adding one',
	LINK: '[File] linking'
};

class FileActions extends EntityActions<FileActionType> {
	addOne(file: AppFile) {
		return {
			type: this.actionType.ADD_ONE,
			payload: file
		};
	}

	link(target: EntityTarget, file: AppFile) {
		return {
			type: this.actionType.LINK,
			payload: { target, file }
		};
	}
}

export interface FileBundle extends EntityBundle {
	ActionTypes: FileActionType;
	Actions: FileActions;
}


export const fromFile: FileBundle = {
	ActionTypes: fileActionTypes,
	Actions: new FileActions(fileActionTypes),
	reducer: entityReducerFactory(fileActionTypes),
	...createEntitySelectors(entityName)
};
