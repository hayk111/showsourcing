import { TypedAction } from '~utils';
import { Entity, EntityRepresentation } from '../../models';
import { Patch, LoadParams } from '../../utils';
import { Action } from '@ngrx/store';

export interface BasicActionTypes {
	LOAD: string;
	LOAD_BY_ID: string;
	ADD: string;
	CREATE: string;
	REPLACING: string;
	DELETE: string;
	SET_PENDING: string;
	PATCH: string;
	MERGE: string;
}

export interface BasicActions {
	load(params?: any);
	loadById(id: string);
	add(toAdd: Array<Entity>);
	create(toCreate: Entity);
	replace(old: Entity, replacing: Entity);
	delete(toDelete: Entity);
	setPending();
	patch(patch: Patch);
	merge();
}

// makes basic action types
export function makeBasicActionTypes(
	repr: EntityRepresentation
): BasicActionTypes {
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
export function addActionType(
	actionTypes: any,
	repr: EntityRepresentation,
	actionName: string
) {
	return (actionTypes[
		actionName.toUpperCase()
	] = `[${repr.entityName.capitalize()}] ${actionName}...`);
}

// makes basic actions functions
export function makeBasicActions(actionType: BasicActionTypes): BasicActions {
	return {
		load: (params?: LoadParams): TypedAction<any> => ({
			type: actionType.LOAD,
			payload: params,
		}),
		loadById: (id: string): TypedAction<any> => ({
			type: actionType.LOAD_BY_ID,
			payload: id,
		}),
		add: (toAdd: Array<Entity>): TypedAction<any> => ({
			type: actionType.ADD,
			payload: toAdd,
		}),
		create: (toCreate: Entity): TypedAction<any> => ({
			type: actionType.CREATE,
			payload: toCreate,
		}),
		replace: (old: Entity, replacing: Entity): TypedAction<any> => ({
			type: actionType.REPLACING,
			payload: { old, replacing },
		}),
		delete: (toDelete: Entity): TypedAction<any> => ({
			type: actionType.DELETE,
			payload: toDelete,
		}),
		setPending: (): Action => ({ type: actionType.SET_PENDING }),
		patch: (patch: Patch): TypedAction<any> => ({
			type: actionType.PATCH,
			payload: patch,
		}),
		merge: (): Action => ({ type: actionType.MERGE }),
	};
}
