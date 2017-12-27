import { EntityTarget } from '../utils/entities.utils';
import { uuid } from '../utils/uuid.utils';
import { AsyncEntityWithTarget } from './async-entity.model';
import { Store } from '@ngrx/store';


export class AppFile extends AsyncEntityWithTarget {
	pending: boolean;
	progress: number;
	fileName: string;
	creationDate: number;
	data: any;

	constructor(public file: File, target: EntityTarget, store: Store<any>) {
		super(target, store);
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
