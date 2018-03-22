import { makeBasicActionTypes, BasicActions } from '~entity';
import { ERM } from '~entity/models';

// keeping capitalization for backward compatibility
// TODO: remove capitalization
export const categoryActionTypes = makeBasicActionTypes(ERM.categories);
export const categoryActions = new BasicActions(categoryActionTypes);
ERM.categories.actions = categoryActions;

// country
export const countryActionTypes = makeBasicActionTypes(ERM.countries);
export const countryActions = new BasicActions(countryActionTypes);

// harbours
export const harbourActionTypes = makeBasicActionTypes(ERM.harbours);
export const harbourActions = new BasicActions(harbourActionTypes);

// incoTerms
export const incoTermsActionTypes = makeBasicActionTypes(ERM.incoTerms);
export const incoTermsActions = new BasicActions(incoTermsActionTypes);

// currency
export const currencyActionTypes = makeBasicActionTypes(ERM.currencies);
export const currencyActions = new BasicActions(currencyActionTypes);

// teamMembers
export const teamMembersActionTypes = makeBasicActionTypes(ERM.events);
export const teamMembersActions = new BasicActions(teamMembersActionTypes);

// customFields
export const customFieldsActionTypes = makeBasicActionTypes(ERM.customFields);
export const customFieldsActions = new BasicActions(customFieldsActionTypes);

// tag
export const tagActionTypes = makeBasicActionTypes(ERM.tags);
export const tagActions = new BasicActions(tagActionTypes);
ERM.tags.actions = tagActions;

// task
export const taskActionTypes = makeBasicActionTypes(ERM.tasks);
export const taskActions = new BasicActions(taskActionTypes);

// team
export const teamActionTypes = makeBasicActionTypes(ERM.teams);
export const teamActions = new BasicActions(teamActionTypes);
