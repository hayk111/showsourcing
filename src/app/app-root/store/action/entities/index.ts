import { makeBasicActionTypes, makeBasicActions, addActionType } from '~entity';
import { ERM } from '~entity/models';

// keeping capitalization for backward compatibility
// category
export const CategoryActionTypes = makeBasicActionTypes(ERM.categories);
export const CategoryActions = makeBasicActions(CategoryActionTypes);
ERM.categories.actions = CategoryActions;

// country
export const CountryActionTypes = makeBasicActionTypes(ERM.countries);
export const CountryActions = makeBasicActions(CountryActionTypes);
ERM.countries.actions = CountryActions;

// harbours
export const HarbourActionTypes = makeBasicActionTypes(ERM.harbours);
export const HarbourActions = makeBasicActions(HarbourActionTypes);
ERM.harbours.actions = HarbourActions;

// incoTerms
export const IncoTermsActionTypes = makeBasicActionTypes(ERM.incoTerms);
export const IncoTermsActions = makeBasicActions(IncoTermsActionTypes);
ERM.incoTerms.actions = IncoTermsActions;

// currency
export const CurrencyActionTypes = makeBasicActionTypes(ERM.currencies);
export const CurrencyActions = makeBasicActions(CurrencyActionTypes);
ERM.currencies.actions = CurrencyActions;

// teamMembers
export const TeamMembersActionTypes = makeBasicActionTypes(ERM.events);
export const TeamMembersActions = makeBasicActions(TeamMembersActionTypes);
ERM.events.actions = TeamMembersActions;

// customFields
export const CustomFieldsActionTypes = makeBasicActionTypes(ERM.customFields);
export const CustomFieldsActions = makeBasicActions(CustomFieldsActionTypes);
ERM.customFields.actions = CustomFieldsActions;

// supplier
export const SupplierActionTypes = makeBasicActionTypes(ERM.suppliers);
export const SupplierActions = makeBasicActions(SupplierActionTypes);
ERM.suppliers.actions = SupplierActions;

// tag
export const TagActionTypes = makeBasicActionTypes(ERM.tags);
export const TagActions = makeBasicActions(TagActionTypes);
ERM.tags.actions = TagActions;

// task
export const TaskActionTypes = makeBasicActionTypes(ERM.tasks);
export const TaskActions = makeBasicActions(TaskActionTypes);
ERM.tasks.actions = TaskActions;

// team
export const TeamActionTypes = makeBasicActionTypes(ERM.teams);
export const TeamActions = makeBasicActions(TeamActionTypes);
ERM.teams.actions = TeamActions;
