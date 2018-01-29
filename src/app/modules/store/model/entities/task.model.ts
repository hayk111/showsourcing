
export enum TaskStatus {
	TODO = 'Todo',
	IN_PROGRESS = 'In Progress',
	DONE = 'Done'
}

export enum TaskType {
	CUSTOM = 'Custom',
	QUOTATION = 'Quotation',
	SAMPLE = 'Sample',
	CATALOGUE = 'Catalogue'
}

export interface Task {
	id: string;
	name: string;
	entityCounter: number;
	teamId: string;
	taskType: TaskType;
	description: string;
	status: TaskStatus;
	code: string;
	modificationCounterStatus: number;
	creationDate: number;
	lastModifiedDate: number;
	createdByUserId: string;
	lastUpdatedByUserId: string;
	archived: boolean;
	modificationCounterArchived: number;
}
