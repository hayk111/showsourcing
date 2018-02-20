import { Entity, EntityRepresentation } from '../../utils/entities.utils';
import { Patch } from '../../utils/patch.interface';

// makes bastic action types
export function makeBasicActionTypes(repr: EntityRepresentation): any {
// using uppercase for backward compatibility with enums
	return {
		LOAD: `[${repr.entityName.capitalize()}] Loading...`,
		// even though items are preloaded, not every info in them are preloaded
		// load by id does a 'deep loading'
		LOAD_BY_ID: `[${repr.entityName.capitalize()}] Loading by id...`,
		ADD: `[${repr.entityName.capitalize()}] Adding...`,
		CREATE: `[${repr.entityName.capitalize()}] Creating...`,
		REPLACING: `[${repr.entityName.capitalize()}] Replacing...`,
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
		loadById: (id: string) => ({ type: actionType.LOAD_BY_ID, payload: id }),
		add: (toAdd: Array<Entity>) => ({ type: actionType.ADD, payload: toAdd }),
		create: (toCreate: Entity) => ({ type: actionType.CREATE, payload: toCreate }),
		replace: (old: Entity, replacing: Entity) => ({ type: actionType.REPLACING, payload: { old, replacing } }),
		delete: (toDelete: Entity) => ({ type: actionType.DELETE, payload: toDelete }),
		setPending: () => ({ type: actionType.SET_PENDING }),
		patch: (patch: Patch) => ({ type: actionType.PATCH, payload: patch }),
		merge: () => ({ type: actionType.MERGE }),
	};
}

