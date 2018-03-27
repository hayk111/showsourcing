import { entityReducerFactory } from '~entity/store/entity.reducer.factory';
import { teamMembersActionTypes } from './team-members.action';

export const teamMemberReducer = entityReducerFactory(teamMembersActionTypes);
