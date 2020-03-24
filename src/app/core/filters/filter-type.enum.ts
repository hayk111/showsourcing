import { Typename } from '~core/erm3/typename.type';


/** when a filter type is plural you can select many of them
 * if a new filter is added, check to add the correspondong filter condition
 * on filter-list.class.ts,
 *
 * we have plural because sometimes we want to filter on the property "tag" while sometimes on "tags".
 */
export enum FilterType {
	ARCHIVED = 'archived',
	ASSIGNEE = 'assignee',
	CATEGORIES = 'categories',
	CATEGORY = 'category',
	CREATED_BY = 'createdBy',
	CUSTOM = 'custom',
	DELETED = 'deleted',
	DONE = 'done',
	DUE_DATE = 'dueDate',
	EVENT = 'event',
	EVENTS = 'events',
	FAVORITE = 'favorite',
	PRODUCT = 'product',
	PROJECT = 'project',
	PROJECTS = 'projects',
	SEARCH = 'search',
	STATUS = 'status',
	SUPPLIER = 'supplier',
	SUPPLIERS = 'suppliers',
	TAG = 'tag',
	TAGS = 'tags',
	TEAM = 'team'
}

