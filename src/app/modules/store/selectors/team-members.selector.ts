import { createSelector } from 'reselect';


export const selectTeamMembers = state => state.teamMembers;

export const selectTeamMember = (userId: string) => {
	return createSelector([selectTeamMembers], members => members.byId[userId]);
};

