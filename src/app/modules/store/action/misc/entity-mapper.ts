import { EntityRepresentation, EntityTarget } from '../../utils/entities.utils';


export enum ActionType {
	PATCH = '[Entity] patching',
	DELETE = '[Entity] delete',
	LOAD_FOR_TARGET = '[Entity] loading for target',
	LOAD_FOR_SELECTION = '[Entity] loading for selection'
}


export interface Patch {
	propName: string;
	value: any;
	target: EntityTarget;
}


export class EntityAction {

	static patch(patch: Patch) {
		return {
			type: ActionType.PATCH,
			payload: patch
		};
	}

	static delete(target: EntityTarget) {
		return {
			type: ActionType.DELETE,
			payload: target
		};
	}

	static loadForTarget(toLoad: EntityRepresentation, target: EntityTarget) {
		return {
			type: ActionType.LOAD_FOR_TARGET,
			payload: { toLoad, target }
		};
	}

	static loadForSelection(toLoad: EntityRepresentation) {
		return {
			type: ActionType.LOAD_FOR_SELECTION,
			payload: toLoad
		};
	}
}
