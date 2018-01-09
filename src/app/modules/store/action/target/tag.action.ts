import { EntityTarget } from '../../utils/entities.utils';


export enum ActionType {
	LOAD = '[Target-Tag] loading',
	SET = '[Target-Tag] setting'
}

export class TargetTagActions {

	static load(target: EntityTarget) {
		return {
			type: ActionType.LOAD,
			payload: target
		};
	}
	// we are setting only ids here.
	static set(tags: Array<string>) {
		return {
			type: ActionType.SET,
			payload: tags
		};
	}
}
