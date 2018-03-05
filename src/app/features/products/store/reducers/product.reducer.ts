import { addEntities, copyById, entityInitialState, EntityState, basicReducerFactory } from '~entity';
import { TypedAction } from '~utils';

import { Product } from '../../models/product.model';
import { ProductActionTypes } from '../actions/product.action';

export const productReducer = basicReducerFactory(ProductActionTypes);
