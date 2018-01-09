import { EntityTarget } from '../../utils/entities.utils';


export enum ActionType {
	LOAD = '[Target-Project] loading',
	SET = '[Target-Project] setting'
}

export class TargetProjectActions {

	static load(target: EntityTarget) {
		return {
			type: ActionType.LOAD,
			payload: target
		};
	}
	// we are setting only ids here.
	static set(projectsIds: Array<string>) {
		return {
			type: ActionType.SET,
			payload: projectsIds
		};
	}
}
