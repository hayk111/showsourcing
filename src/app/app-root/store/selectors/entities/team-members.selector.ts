import { selectUser } from '~user/store/selectors';
import { createSelector } from 'reselect';
import { User } from '~app/features/user';

export const selectTeamMembersState = state => state.entities.teamMembers;
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
