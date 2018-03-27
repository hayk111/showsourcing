import { basicReducerFactory } from '~app/shared/entity/store/entity.reducer.factory';
import { supplierStatusActionTypes } from '~app/features/suppliers/store/supplier-status/supplier-status.action';

export const supplierStatusReducer = basicReducerFactory(supplierStatusActionTypes);
