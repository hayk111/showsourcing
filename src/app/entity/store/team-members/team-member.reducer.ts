import { basicReducerFactory } from '~app/shared/entity/store/entity.reducer.factory';
import { teamMembersActionTypes } from '~app/features/team/store/actions';

export const teamMemberReducer = basicReducerFactory(teamMembersActionTypes);
