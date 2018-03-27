import { basicReducerFactory } from '~app/shared/entity/store/entity.reducer.factory';
import { countryActionTypes } from '~app/shared/country/country.action';


export const countryReducer = basicReducerFactory(countryActionTypes);
