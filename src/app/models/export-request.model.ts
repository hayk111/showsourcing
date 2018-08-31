import { User } from '~models/user.model';
import { uuid } from '~utils';

export class ExportRequest implements ExportRequestConfig {
	id: string;
	format: string;
	type: string;
	query: string;
	status = 'created';
	documentUrl: string;
	errors: string[];
	creationDate: string;
	createdBy: User;

	constructor(config: ExportRequestConfig) {
		Object.assign(this, config);
		this.id = uuid();
		this.creationDate = '' + new Date();
	}

}

export interface ExportRequestConfig {
	format?: string;
	type?: string;
	query?: string;
}
