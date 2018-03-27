import { entityReducerFactory } from '~entity/store/entity.reducer.factory';
import { productStatusActionTypes } from './product-status.action';

export const productStatusReducer = entityReducerFactory(productStatusActionTypes);
