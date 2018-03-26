import { Action } from '@ngrx/store';
import { Patch, ApiParams } from '../utils';
import { TypedAction } from '~utils';

import { Entity, EntityRepresentation, EntityTarget } from '../models';
import { Swap } from '~app/shared/entity/utils';

export interface BasicActionTypes {
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
export function makeBasicActionTypes(repr: EntityRepresentation): BasicActionTypes {
	// using uppercase for backward compatibility with enums
	return {
		FOCUS: `[${repr.entityName.capitalize()}] Focussing...`,
		LOAD: `[${repr.entityName.capitalize()}] Loading...`,
		LOAD_MORE: `[${repr.entityName.capitalize()}] Loading more...`,
		LOAD_BY_ID: `[${repr.entityName.capitalize()}] Loading by id...`,
		LOAD_FOR_SELECTION: `[${repr.entityName.capitalize()}] Loading for current selection`,
		SET: `[${repr.entityName.capitalize()} Setting...]`,
		ADD: `[${repr.entityName.capitalize()}] Adding...`,
		CREATE: `[${repr.entityName.capitalize()}] Creating...`,
		REPLACE: `[${repr.entityName.capitalize()}] Replacing...`,
		DELETE: `[${repr.entityName.capitalize()}] Deleting...`,
		SET_PENDING: `[${repr.entityName.capitalize()}] Setting pending...`,
		PATCH: `[${repr.entityName.capitalize()}] Patching...`,
		DOWNLOAD: `[${repr.entityName.capitalize()}] Downloading...`,
		MERGE: `[${repr.entityName.capitalize()}] Merging...`,
		RESET: `[${repr.entityName.capitalize()}] RESET...`
	};
}

// makes basic actions functions
export class BasicActions {
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
