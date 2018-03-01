import { EntityTarget } from '~entity';

export enum ActionType {
	SELECT = '[Target] selecting',
}

export class TargetAction {
	static select(target: EntityTarget) {
		return {
			type: ActionType.SELECT,
			payload: target
		};
	}
}
