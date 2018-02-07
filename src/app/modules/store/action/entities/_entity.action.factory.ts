import { Entity, EntityRepresentation } from '../../utils/entities.utils';
import { Patch } from '../../utils/patch.interface';

// LOAD, ADD, PATCH, MERGE

export function makeActionType(repr: EntityRepresentation) {
// using uppercase for backward compatibility with enums
	return {
		LOAD: `[${repr.entityName}] Loading...`,
		ADD: `[${repr.entityName}] Adding...`,
		DELETE: `[${repr.entityName}] Deleting...`,
		SET_PENDING: `[${repr.entityName}] Setting pending...`,
		PATCH: `[${repr.entityName}] Patching...`,
		MERGE: `[${repr.entityName}] Merging...`,
	};
}

export function makeActions(actionType: any) {
	return {
		load: () => ({ type: actionType.LOAD }),
		add: (toAdd: Entity) => ({ type: actionType.ADD, payload: toAdd }),
		delete: (toDelete: Entity) => ({ type: actionType.DELETE, payload: toDelete }),
		setPending: () => ({ type: actionType.SET_PENDING }),
		patch: (patch: Patch) => ({ type: actionType.PATCH }),
		merge: () => ({ type: actionType.MERGE }),
	};
}
