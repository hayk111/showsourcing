import { EntityWithAudit } from '~models/_entity.model';
import { uuid } from '~utils';

export class Attachment {
	id: string;
	fileName: string;
	url: string;
	size?: number;
	__typename ?= 'File';

	constructor(fileName: string, size?: number) {
		this.id = uuid();
		this.fileName = fileName;
		this.size = size;
	}
}
