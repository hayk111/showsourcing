import { EntityWithAudit } from '~models/_entity.model';

export class AppFile extends EntityWithAudit<undefined> {
	fileName: string;
	deleted: boolean;
	__typename ?= 'File';

	constructor(extension: string) {
		super();
		this.fileName = this.id + '.' + extension;
	}
}
