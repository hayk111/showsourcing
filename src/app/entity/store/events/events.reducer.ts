import { eventActionTypes } from './events.action';
import { basicReducerFactory } from '~app/shared/entity';

export const eventReducer = basicReducerFactory(eventActionTypes);
