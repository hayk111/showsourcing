import { basicReducerFactory } from '~app/shared/entity/store/entity.reducer.factory';
import { teamActionTypes } from '~app/features/team/store/actions';

export const teamReducer = basicReducerFactory(teamActionTypes);
