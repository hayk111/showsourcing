import { User } from '../model/user.model';



export enum ActionType {
	SET_TEAM_MEMBERS = '[TeamMembers] setting'
}

export class TeamMembersActions {
	static setMembers(members: Array<User>) {
		return {
			type: ActionType.SET_TEAM_MEMBERS,
			payload: members
		};
	}
}
