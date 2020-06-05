import { uuid } from '~utils';


export class Entity<G = any> {
	id?: string = uuid();

	_deleted?: boolean = null;
	_lastChangedAt?: string = '' + new Date();
	__typename?: string;

	constructor(config?: G) {
		Object.assign(this, config);
	}
}



