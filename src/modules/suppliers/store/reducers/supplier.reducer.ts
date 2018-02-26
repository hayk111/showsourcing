import { EntityState, entityInitialState, TypedAction, addEntities, copyById } from '~store';
import { ActionType } from '../actions';
import { basicReducerFactory } from '~store';

export const supplierReducer = basicReducerFactory(ActionType);
