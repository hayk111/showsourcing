import { User } from '../model/user.model';



export enum ActionType {
	LOAD = '[TeamMembers] loading',
	ADD_TEAM_MEMBERS = '[TeamMembers] adding'
}

export class TeamMembersActions {

	static load(id: string, maxCounter: number) {
		return {
			type: ActionType.LOAD,
			payload: { id, maxCounter }
		};
	}

	static addMembers(members: Array<User>) {
		return {
			type: ActionType.ADD_TEAM_MEMBERS,
			payload: members
		};
	}
}
