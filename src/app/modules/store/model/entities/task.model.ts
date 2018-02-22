import { uuid } from '../../utils/uuid.utils';

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

export class Task {
	id: string;
	productId: string;
	name: string;
	teamId: string;
	taskType?: TaskType;
	description: string;
	status?: TaskStatus;
	code?: string;
	creationDate: number;
	lastModifiedDate?: number;
	createdByUserId?: string;
	lastUpdatedByUserId?: string;
	archived?: boolean;
	pending = true;

	constructor({ name, description, type, status, productId, userId }: TaskParams) {
		this.name = name;
		this.description = description;
		this.createdByUserId = userId;
		this.status = status;
		this.taskType = type;
		this.productId = productId;
		this.creationDate = Date.now();
		this.id = uuid();
	}
}

export interface TaskParams {
	name: string;
	description: string;
	status: TaskStatus;
	type: TaskType;
	productId: string;
	userId: string;
}
