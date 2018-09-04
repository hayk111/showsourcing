import { EntityWithAudit } from '~models/_entity.model';
import { uuid } from '~utils';

export class Attachment {
	id: string;
	fileName: string;
	url: string;
	__typename ?= 'File';

	constructor(extension: string) {
		this.id = uuid();
		this.fileName = this.id + '.' + extension;
	}
}
