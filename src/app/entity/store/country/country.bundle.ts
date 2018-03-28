import { makeEntityBundle } from '../entity-bundle';
import { ERM } from '~app/entity';

export const {
	countryActions,
	countryActionTypes,
	countryReducer,
	selectCountryState,
	selectCountryArray,
	selectCountryById
} = makeEntityBundle(ERM.country);
