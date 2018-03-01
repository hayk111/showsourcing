import { makeBasicActionTypes, makeBasicActions, addActionType } from '~entity';
import { entityRepresentationMap } from '~entity';

// keeping capitalization for backward compatibility
// category
export const CategoryActionTypes = makeBasicActionTypes(entityRepresentationMap.categories);
export const CategoryActions = makeBasicActions(CategoryActionTypes);
entityRepresentationMap.categories.actions = CategoryActions;

// country
export const CountryActionTypes = makeBasicActionTypes(entityRepresentationMap.countries);
export const CountryActions = makeBasicActions(CountryActionTypes);
entityRepresentationMap.countries.actions = CountryActions;

// currency
export const CurrencyActionTypes = makeBasicActionTypes(entityRepresentationMap.currencies);
export const CurrencyActions = makeBasicActions(CurrencyActionTypes);
entityRepresentationMap.currencies.actions = CurrencyActions;

// teamMembers
export const TeamMembersActionTypes = makeBasicActionTypes(entityRepresentationMap.events);
export const TeamMembersActions = makeBasicActions(TeamMembersActionTypes);
entityRepresentationMap.events.actions = TeamMembersActions;

// customFields
export const CustomFieldsActionTypes = makeBasicActionTypes(entityRepresentationMap.customFields);
export const CustomFieldsActions = makeBasicActions(CustomFieldsActionTypes);
entityRepresentationMap.customFields.actions = CustomFieldsActions;

// event
export const EventActionTypes = makeBasicActionTypes(entityRepresentationMap.events);
export const EventActions = makeBasicActions(EventActionTypes);
entityRepresentationMap.events.actions = EventActions;

// projects
export const ProjectActionTypes = makeBasicActionTypes(entityRepresentationMap.projects);
export const ProjectActions = makeBasicActions(ProjectActionTypes);
entityRepresentationMap.projects.actions = ProjectActions;

// supplier
export const SupplierActionTypes = makeBasicActionTypes(entityRepresentationMap.suppliers);
export const SupplierActions = makeBasicActions(SupplierActionTypes);
entityRepresentationMap.suppliers.actions = SupplierActions;

// tag
export const TagActionTypes = makeBasicActionTypes(entityRepresentationMap.tags);
export const TagActions = makeBasicActions(TagActionTypes);
entityRepresentationMap.tags.actions = TagActions;

// task
export const TaskActionTypes = makeBasicActionTypes(entityRepresentationMap.tasks);
export const TaskActions = makeBasicActions(TaskActionTypes);
entityRepresentationMap.tasks.actions = TaskActions;

// team
export const TeamActionTypes = makeBasicActionTypes(entityRepresentationMap.teams);
export const TeamActions = makeBasicActions(TeamActionTypes);
entityRepresentationMap.teams.actions = TeamActions;
