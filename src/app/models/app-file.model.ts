import { BaseEntity } from './_entity.model';

export class AppFile extends BaseEntity<undefined> {
	fileName: string;
	deleted: boolean;
	constructor(extension: string) {
		super();
		this.fileName = this.id + '.' + extension;
	}
}
