import { selectUser, User } from '../user';
import { createSelector } from 'reselect';

export const selectTeamMembersState = state => state.entities.teamMember;
export const selectTeamMembers = createSelector(selectTeamMembersState, state => Object.values(state.byId));
export const selectTeamMemberByUserId = (userId: string) => {
	return createSelector([selectTeamMembersState], members => members.byId[userId]);
};

export const selectMyTeamMembers = createSelector(
	[selectTeamMembers, selectUser],
	(members: Array<User>, user: User) => {
		return Object.values(members).filter(member => member.currentTeamId === user.currentTeamId);
	}
);
