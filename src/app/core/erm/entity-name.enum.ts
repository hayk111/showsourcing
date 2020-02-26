
export enum EntityName {
	ATTACHMENT = 'attachment',
	ACTIVITY = 'activity',
	CATEGORY = 'category', // provided by the api
	COMMENT = 'comment',
	COMPANY = 'company', // provided by the api
	CONTACT = 'contact', // provided by the api
	COUNTRY = 'country', // ? not used
	CURRENCY = 'currency',
	DESCRIPTOR = 'descriptor', // provided by the api
	EMAIL = 'email', // ? not used // delete
	EVENT = 'event',
	EXPORT = 'export',
	FILE = 'file', // ? not used // to delete
	HARBOUR = 'harbour', // ? not used
	IMAGE = 'image', // provided by the api
	INVITATION = 'invitation', // ? not used
	LOCATION = 'location',
	PRODUCT = 'product', // provided by the api
	PROJECT = 'project', // ? not used
	REQUEST = 'request',
	REQUEST_ELEMENT = 'request element',
	SAMPLE = 'sample',
	SUPPLIER = 'supplier', // provided by the api
	TAG = 'tag',
	TASK = 'task', // provided by the api
	TEAM = 'team', // provided by the api // ! there is no update/delete TEAM
	TEAM_USER = 'teamUser', // provided by the api
	// TEAM_USER_BY_USER = 'teamUserByUser', // provided by the api // ! ListTeamUserByUser is not plurial and doesn't have update/delete/create
	TEMPALTE_FIELD = 'template field', // ? not used // to delete
	TEAM_MEMBER = 'team member', // ? not used to delete
	USER = 'user',
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
 'email'|
 'event'|
 'export'|
 'file'|
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
 'user';

