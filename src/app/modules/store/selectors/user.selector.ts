import { selectTeams } from './teams.selector';
import { createSelector } from 'reselect';
import { User } from '../model/user.model';
import { Team } from '../model/team.model';

export const selectUser = state => state.entities.user;

export const selectUserTeamId = createSelector([selectUser], user => user.currentTeamId);
