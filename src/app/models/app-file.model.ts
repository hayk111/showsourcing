import { EntityWithAudit } from '~models/_entity.model';

export class AppFile extends EntityWithAudit<undefined> {
	fileName: string;
	deleted: boolean;
	constructor(extension: string) {
		super();
		this.fileName = this.id + '.' + extension;
	}
}
