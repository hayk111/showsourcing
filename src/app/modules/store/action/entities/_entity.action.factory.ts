import { Entity, EntityRepresentation } from '../../utils/entities.utils';
import { Patch } from '../../utils/patch.interface';

// makes bastic action types
export function makeBasicActionTypes(repr: EntityRepresentation): any {
// using uppercase for backward compatibility with enums
	return {
		LOAD: `[${repr.entityName.capitalize()}] Loading...`,
		ADD: `[${repr.entityName.capitalize()}] Adding...`,
		DELETE: `[${repr.entityName.capitalize()}] Deleting...`,
		SET_PENDING: `[${repr.entityName.capitalize()}] Setting pending...`,
		PATCH: `[${repr.entityName.capitalize()}] Patching...`,
		MERGE: `[${repr.entityName.capitalize()}] Merging...`,
	};
}

// adds actionType to the basic types
export function addActionType(actionTypes: any, repr: EntityRepresentation, actionName: string) {
	return actionTypes[actionName.toUpperCase()] = `[${repr.entityName.capitalize()}] ${actionName}...`;
}


// makes basic actions functions
export function makeBasicActions(actionType: any) {
	return {
		load: (params?: any) => ({ type: actionType.LOAD, payload: params }),
		add: (toAdd: Entity) => ({ type: actionType.ADD, payload: toAdd }),
		delete: (toDelete: Entity) => ({ type: actionType.DELETE, payload: toDelete }),
		setPending: () => ({ type: actionType.SET_PENDING }),
		patch: (patch: Patch) => ({ type: actionType.PATCH }),
		merge: () => ({ type: actionType.MERGE }),
	};
}

