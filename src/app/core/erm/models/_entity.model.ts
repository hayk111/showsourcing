import { uuid } from '~utils';


export class Entity<G = any> {
	id: string = uuid();

	_deleted?: boolean = null;
	_lastChangedAt?: string = '' + new Date();
	_version?: number;

	constructor(config?: G) {
		Object.assign(this, config);
	}
}



