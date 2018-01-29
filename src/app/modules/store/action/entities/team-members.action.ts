import { User } from '../../model/entities/user.model';



export enum ActionType {
	LOAD = '[TeamMembers] loading',
	ADD = '[TeamMembers] adding'
}

export class TeamMembersActions {

	static load(id: string, maxCounter: number) {
		return {
			type: ActionType.LOAD,
			payload: { id, maxCounter }
		};
	}

	static add(members: Array<User>) {
		return {
			type: ActionType.ADD,
			payload: members
		};
	}
}
