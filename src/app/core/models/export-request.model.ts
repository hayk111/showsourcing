import { User } from '~models/user.model';
import { uuid } from '~utils';

export interface ExportRequestConfig {
	format?: string;
	type?: string;
	query?: string;
}

export class ExportRequest implements ExportRequestConfig {
	id: string;
	format: string;
	type: string;
	query: string;
	status = 'pending';
	documentUrl: string;
	errors: string[];
	creationDate: string;
	createdBy: User;
	__typename?= 'ExportRequest';

	constructor(config: ExportRequestConfig) {
		Object.assign(this, config);
		this.id = uuid();
		this.creationDate = '' + new Date();
	}

}
