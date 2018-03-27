import { basicReducerFactory } from '~app/shared/entity/store/entity.reducer.factory';
import { categoryActionTypes } from '~app/features/products';

export const categoryReducer = basicReducerFactory(categoryActionTypes);
