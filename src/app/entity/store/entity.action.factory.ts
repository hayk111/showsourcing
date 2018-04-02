import { Action } from '@ngrx/store';
import { Patch, ApiParams } from '../utils';
import { TypedAction } from '~utils';

import { Entity, EntityRepresentation, EntityTarget } from './entity.model';
import { Swap } from '../utils';

export interface EntityActionTypes {
	// when focussing on one entity (viewing its details), this is used to load related entities
	FOCUS: string;
	// loading entities or a subset of entities
	LOAD: string;
	// for pagination
	LOAD_MORE: string;
	// for loading one
	LOAD_BY_ID: string;
	// when we load entities relative to the currently focussed/selected entity,
	// example: api/team/:id/product/:id/task when we are on product-details page
	LOAD_FOR_SELECTION: string;
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
	RESET: string;
}

// makes basic action types
export function makeEntityActionTypes(entityName: string): EntityActionTypes {
	// using uppercase for backward compatibility with enums
	return {
		FOCUS: `[${entityName.capitalize()}] Focussing...`,
		LOAD: `[${entityName.capitalize()}] Loading...`,
		LOAD_MORE: `[${entityName.capitalize()}] Loading more...`,
		LOAD_BY_ID: `[${entityName.capitalize()}] Loading by id...`,
		LOAD_FOR_SELECTION: `[${entityName.capitalize()}] Loading for current selection`,
		SET: `[${entityName.capitalize()} Setting...]`,
		ADD: `[${entityName.capitalize()}] Adding...`,
		CREATE: `[${entityName.capitalize()}] Creating...`,
		REPLACE: `[${entityName.capitalize()}] Replacing...`,
		DELETE: `[${entityName.capitalize()}] Deleting...`,
		SET_PENDING: `[${entityName.capitalize()}] Setting pending...`,
		PATCH: `[${entityName.capitalize()}] Patching...`,
		DOWNLOAD: `[${entityName.capitalize()}] Downloading...`,
		MERGE: `[${entityName.capitalize()}] Merging...`,
		RESET: `[${entityName.capitalize()}] Resetting...`
	};
}

// makes basic actions functions
export class EntityActions {
	constructor(protected actionType: any) { }

	focus(id: string): TypedAction<any> {
		return {
			type: this.actionType.FOCUS,
			payload: id,
		};
	}

	load(params?: ApiParams): TypedAction<any> {
		return {
			type: this.actionType.LOAD,
			payload: params,
		};
	}

	loadMore(params?: ApiParams): TypedAction<any> {
		return {
			type: this.actionType.LOAD_MORE,
			payload: params,
		};
	}

	loadById(id: string): TypedAction<any> {
		return {
			type: this.actionType.LOAD_BY_ID,
			payload: id,
		};
	}

	loadForSelection() {
		return {
			type: this.actionType.LOAD_FOR_SELECTION,
		};
	}

	set(toSet: Array<Entity>): TypedAction<any> {
		return {
			type: this.actionType.SET,
			payload: toSet,
		};
	}

	add(toAdd: Array<Entity>, target?: EntityTarget): TypedAction<any> {
		return {
			type: this.actionType.ADD,
			payload: toAdd,
		};
	}

	create(toCreate: Entity): TypedAction<any> {
		return {
			type: this.actionType.CREATE,
			payload: toCreate,
		};
	}

	replace(swaps: Array<Swap>): TypedAction<any> {
		return {
			type: this.actionType.REPLACE,
			payload: swaps,
		};
	}

	delete(ids: Array<string>): TypedAction<any> {
		return {
			type: this.actionType.DELETE,
			payload: ids,
		};
	}

	download(url: string): TypedAction<any> {
		return {
			type: this.actionType.DOWNLOAD,
			payload: url,
		};
	}

	setPending(): Action {
		return {
			type: this.actionType.SET_PENDING,
		};
	}

	patch(patch: Patch): TypedAction<any> {
		return {
			type: this.actionType.PATCH,
			payload: patch,
		};
	}

	merge(): Action {
		return {
			type: this.actionType.MERGE,
		};
	}

	reset(): Action {
		return { type: this.actionType.RESET };
	}
}
