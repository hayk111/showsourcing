import { entityStateToArray } from '~app/shared/entity';
import { createSelector } from 'reselect';


export const selectCountryState = state => state.entities.countries;
export const selectCountries = createSelector([selectCountryState], state => entityStateToArray(state));
