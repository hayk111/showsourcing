import { EntityTarget } from '~entity';

export const actionType = {
	SELECT: '[Target] selecting',
};

export class TargetAction {
	static select(target: EntityTarget) {
		return {
			type: actionType.SELECT,
			payload: target,
		};
	}
}
