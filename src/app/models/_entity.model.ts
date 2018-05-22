import { Audit } from './audit.model';
import { uuid } from '~utils';

export interface Entity {
	id?: string;
	name?: string;
}

export class BaseEntity<G> implements Entity {
	id?: string;
	audit?: Audit;

	constructor(config: G) {
		this.id = uuid();
		this.audit = new Audit();
		Object.assign(this, config);
	}
}


