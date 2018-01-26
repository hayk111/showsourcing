import { selectTeams } from './teams.selector';
import { createSelector } from 'reselect';
import { User } from '../../model/entities/user.model';
import { Team } from '../../model/entities/team.model';

export const selectUser = state => state.entities.user;

export const selectUserTeamId = createSelector([selectUser], user => user.currentTeamId);
