
export enum EntityName {
	ATTACHMENT = 'attachment',
	ACTIVITY = 'activity',
	CATEGORY = 'category', // provided by the api
	COMMENT = 'comment',
	COMPANY = 'company', // provided by the api
	CONTACT = 'contact', // provided by the api
	COUNTRY = 'country',
	CURRENCY = 'currency',
	DESCRIPTOR = 'descriptor', // provided by the api
	EMAIL = 'email', // ? not used // delete
	EVENT = 'event',
	EXPORT = 'export',
	FILE = 'file', // ? not used // to delete
	HARBOUR = 'harbour',
	IMAGE = 'image', // provided by the api
	INVITATION = 'invitation',
	LOCATION = 'location',
	PRODUCT = 'product', // provided by the api
	PROJECT = 'project',
	REQUEST = 'request',
	REQUEST_ELEMENT = 'request element',
	SAMPLE = 'sample',
	SUPPLIER = 'supplier', // provided by the api
	TAG = 'tag',
	TASK = 'task', // provided by the api
	TEAM = 'team', // provided by the api // ! there is no update/delete TEAM
	TEAM_USER = 'teamUser', // provided by the api
	TEMPALTE_FIELD = 'template field', // ? not used // to delete
	TEAM_MEMBER = 'team member', // ? not used to delete
	USER = 'user',
	TEAM_BY_USER = 'teamByUser'
}

export type EntityNameType =  'attachment'|
 'activity'|
 'category'|
 'comment'|
 'company'|
 'contact'|
 'country'|
 'currency'|
 'descriptor'|
 'event'|
 'export'|
 'harbour'|
 'image'|
 'invitation'|
 'location'|
 'product'|
 'project'|
 'request'|
 'request element'|
 'sample'|
 'supplier'|
 'tag'|
 'task'|
 'team'|
 'user'|
 'teamUser';

