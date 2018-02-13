import { Action } from '@ngrx/store';
import { Country } from '../../model/entities/country.model';
import { TypedAction } from '../../utils/typed-action.interface';
import { makeBasicActionTypes, makeBasicActions } from './_entity.action.factory';
import { entityRepresentationMap } from '../../utils/entities.utils';


// keeping capitalization for backward compatibility
export const ActionType = makeBasicActionTypes(entityRepresentationMap.countries);
export const CountryActions = makeBasicActions(ActionType);
entityRepresentationMap.countries.actions = CountryActions;

