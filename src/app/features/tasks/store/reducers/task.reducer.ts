import { EntityState, entityInitialState, addEntities, copyById } from '~entity';
import { ActionType } from '../actions';
import { basicReducerFactory } from '~entity';

export const taskReducer = basicReducerFactory(ActionType);
