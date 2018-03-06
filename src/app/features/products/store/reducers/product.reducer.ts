import { basicReducerFactory } from '~store';

import { ProductActionTypes } from '../actions/product.action';

export const productReducer = basicReducerFactory(ProductActionTypes);
