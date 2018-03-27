import { entityReducerFactory } from '~entity/store/entity.reducer.factory';
import { countryActionTypes } from './country.action';


export const countryReducer = entityReducerFactory(countryActionTypes);
