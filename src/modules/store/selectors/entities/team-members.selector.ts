import { createSelector } from 'reselect';


export const selectTeamMembers = state => state.entities.teamMembers;

export const selectTeamMember = (userId: string) => {
	return createSelector([selectTeamMembers], members => members.byId[userId]);
};

