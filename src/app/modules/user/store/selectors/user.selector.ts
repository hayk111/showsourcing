import { createSelector } from 'reselect';

export const selectUser = state => state.entities.user;

export const selectUserTeamId = createSelector([selectUser], user => user.currentTeamId);
