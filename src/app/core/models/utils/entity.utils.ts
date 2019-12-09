export enum EntityName {
	ATTACHMENT = 'attachment',
	ACTIVITY = 'activity',
	CATEGORY = 'category',
	COMMENT = 'comment',
	COMPANY = 'company',
	CONTACT = 'contact',
	COUNTRY = 'country',
	CURRENCY = 'currency',
	EMAIL = 'email',
	EVENT = 'event',
	FILE = 'file',
	HARBOUR = 'harbour',
	IMAGE = 'image',
	INVITATION = 'invitation',
	LOCATION = 'location',
	PRODUCT = 'product',
	PROJECT = 'project',
	REQUEST = 'request',
	REQUEST_ELEMENT = 'request element',
	SAMPLE = 'sample',
	SUPPLIER = 'supplier',
	TAG = 'tag',
	TASK = 'task',
	TEAM = 'team',
	TEAM_MEMBER = 'team-member',
	USER = 'user',
}

export enum EntityTypeEnum {
	ATTACHMENT = 'ATTACHMENT',
	ACTIVITY = 'ACTIVITY',
	CATEGORY = 'CATEGORY',
	CONTACT = 'CONTACT',
	EVENT = 'EVENT',
	EXPORT = 'EXPORT',
	PRODUCT = 'PRODUCT',
	INVITATION = 'INVITATION',
	REQUEST = 'REQUEST',
	PROJECT = 'PROJECT',
	SUPPLIER = 'SUPPLIER',
	SAMPLE = 'SAMPLE',
	USER = 'USER',
	TASK = 'TASK',
	TEAM_MEMBER = 'TEAM_MEMBER',
	TAG = 'TAG',
}

export type EntityType = 'CATEGORY' | 'CONTACT' | 'EVENT' | 'PRODUCT' | 'REQUEST' | 'EXPORT'
	| 'PROJECT' | 'TASK' | 'TEAM-MEMBER' | 'SUPPLIER' | 'SAMPLE' | 'USER' | 'TAG' | 'INVITATION';
