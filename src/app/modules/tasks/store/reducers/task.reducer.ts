import { EntityState, entityInitialState, TypedAction, addEntities, copyById } from '~store';
import { ActionType } from '../actions';
import { basicReducerFactory } from '~store';

export const taskReducer = basicReducerFactory(ActionType);
