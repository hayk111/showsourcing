import { entityReducerFactory } from '~entity/store/entity.reducer.factory';
import { supplierStatusActionTypes } from './supplier-status.action';

export const supplierStatusReducer = entityReducerFactory(supplierStatusActionTypes);
