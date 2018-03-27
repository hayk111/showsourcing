import { basicReducerFactory } from '~app/shared/entity/store/entity.reducer.factory';
import { productStatusActionTypes } from './product-status.action';

export const productStatusReducer = basicReducerFactory(productStatusActionTypes);
