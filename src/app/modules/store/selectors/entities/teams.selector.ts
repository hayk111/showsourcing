import { createSelector } from 'reselect';
import { selectUser } from './user.selector';


export const selectTeams = state => state.entities.teams;


