import { currencyActionTypes } from './currency.action';
import { entityReducerFactory } from '~entity/store/entity.reducer.factory';

export const currencyReducer = entityReducerFactory(currencyActionTypes);
