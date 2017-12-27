import { EntityTarget } from '../utils/entities.utils';
import { uuid } from '../utils/uuid.utils';


export class AppFile {
	id: string;
	pending: boolean;
	progress: number;
	fileName: string;
	creationDate: number;
	data: any;

	constructor(public file: File, public target: EntityTarget, public createdByUserId: string) {
		// when constructor is used then it's a pending file
		this.id = uuid();
		this.pending = true;
		this.creationDate = Date.now();
		this.progress = 0;
		this.fileName = file.name;
	}

	static getExtension(name: string) {
		const parts = name.split('.');
		return parts[parts.length - 1];
	}

}
