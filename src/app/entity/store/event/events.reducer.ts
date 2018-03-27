import { eventActionTypes } from './events.action';
import { entityReducerFactory } from '~entity/store/entity.reducer.factory';

export const eventReducer = entityReducerFactory(eventActionTypes);
