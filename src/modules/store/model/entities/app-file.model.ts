import { Entity } from '../../utils/entities.utils';


export class AppFile extends Entity {
	pending: boolean;
	progress: number;
	fileName: string;
	data: any;
	url: string;

	constructor(public file: File, userId: string) {
		super(userId);
		// when constructor is used then it's a pending file
		this.pending = true;
		this.progress = 0;
		this.fileName = file.name;
	}

	static getExtension(name: string) {
		const parts = name.split('.');
		return parts[parts.length - 1];
	}

}
