import { Audit } from './audit.model';
import { uuid } from '~utils';

export class Entity<G> {
	id?: string;
	audit?: Audit;

	constructor(config: G) {
		this.id = uuid();
		this.audit = new Audit();
		Object.assign(this, config);
	}
}