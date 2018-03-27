import { entityReducerFactory } from '~entity/store/entity.reducer.factory';
import { categoryActionTypes } from './category.action';

export const categoryReducer = entityReducerFactory(categoryActionTypes);
