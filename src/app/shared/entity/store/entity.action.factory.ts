import { Action } from '@ngrx/store';
import { Patch, LoadParams } from '~store/utils';
import { TypedAction } from '~utils';

import { Entity, EntityRepresentation } from '../models';
import { Swap } from '~app/shared/entity/utils';

export interface BasicActionTypes {
	// loading entities or a subset of entities
	LOAD: string;
	// for pagination
	LOAD_MORE: string;
	// for loading one
	LOAD_BY_ID: string;
	// adding entities
	ADD: string;
	// setting entities (will forget previous ones).
	SET: string;
	CREATE: string;
	// replace existing entities
	REPLACE: string;
	DELETE: string;
	DOWNLOAD: string;
	// set pending so we can display a spinner on screen
	SET_PENDING: string;
	// modify property of entity
	PATCH: string;
	MERGE: string;
}

export interface BasicActions {
	load(params?: any);
	loadMore(params?: any);
	loadById(id: string);
	set(toSet: Array<Entity>);
	add(toAdd: Array<Entity>);
	create(toCreate: Entity);
	replace(swaps: Array<Swap>);
	delete(ids: Array<string>);
	download(url: string);
	setPending();
	patch(patch: Patch);
	merge();
}

// makes basic action types
export function makeBasicActionTypes(repr: EntityRepresentation): BasicActionTypes {
	// using uppercase for backward compatibility with enums
	return {
		LOAD: `[${repr.entityName.capitalize()}] Loading...`,
		LOAD_MORE: `[${repr.entityName.capitalize()}] Loading more...`,
		LOAD_BY_ID: `[${repr.entityName.capitalize()}] Loading by id...`,
		SET: `[${repr.entityName.capitalize()} Setting...]`,
		ADD: `[${repr.entityName.capitalize()}] Adding...`,
		CREATE: `[${repr.entityName.capitalize()}] Creating...`,
		REPLACE: `[${repr.entityName.capitalize()}] Replacing...`,
		DELETE: `[${repr.entityName.capitalize()}] Deleting...`,
		SET_PENDING: `[${repr.entityName.capitalize()}] Setting pending...`,
		PATCH: `[${repr.entityName.capitalize()}] Patching...`,
		DOWNLOAD: `[${repr.entityName.capitalize()}] Downloading...`,
		MERGE: `[${repr.entityName.capitalize()}] Merging...`,
	};
}

// adds actionType to the basic types
export function addActionType(actionTypes: any, repr: EntityRepresentation, actionName: string) {
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
		loadMore: (params?: LoadParams): TypedAction<any> => ({
			type: actionType.LOAD_MORE,
			payload: params,
		}),
		loadById: (id: string): TypedAction<any> => ({
			type: actionType.LOAD_BY_ID,
			payload: id,
		}),
		set: (toSet: Array<Entity>): TypedAction<any> => ({
			type: actionType.SET,
			payload: toSet,
		}),
		add: (toAdd: Array<Entity>): TypedAction<any> => ({
			type: actionType.ADD,
			payload: toAdd,
		}),
		create: (toCreate: Entity): TypedAction<any> => ({
			type: actionType.CREATE,
			payload: toCreate,
		}),
		replace: (swaps: Array<Swap>): TypedAction<any> => ({
			type: actionType.REPLACE,
			payload: swaps,
		}),
		delete: (ids: Array<string>): TypedAction<any> => ({
			type: actionType.DELETE,
			payload: ids,
		}),
		download: (url: string): TypedAction<any> => ({
			type: actionType.DOWNLOAD,
			payload: url,
		}),
		setPending: (): Action => ({ type: actionType.SET_PENDING }),
		patch: (patch: Patch): TypedAction<any> => ({
			type: actionType.PATCH,
			payload: patch,
		}),
		merge: (): Action => ({ type: actionType.MERGE }),
	};
}
