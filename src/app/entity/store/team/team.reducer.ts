import { entityReducerFactory } from '~entity/store/entity.reducer.factory';
import { teamActionTypes } from './team.action';

export const teamReducer = entityReducerFactory(teamActionTypes);
