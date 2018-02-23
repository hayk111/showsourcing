import { EntityState, entityInitialState, TypedAction, addEntities, copyById } from '~store';
import { Supplier } from '~suppliers/models';
import { ActionType } from '~suppliers/store/actions';
import { basicReducerFactory } from '~store';

export const supplierReducer = basicReducerFactory(ActionType);
