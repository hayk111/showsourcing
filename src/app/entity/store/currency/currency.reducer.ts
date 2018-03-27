import { currencyActionTypes } from './currency.action';
import { basicReducerFactory } from '~app/shared/entity/store/entity.reducer.factory';

export const currencyReducer = basicReducerFactory(currencyActionTypes);
