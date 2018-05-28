import { uuid } from '~app-root/utils/uuid.utils';


export class SupplierType {
	id?: string;
	name?: string;
	deleted ?= false;

	constructor(config: SupplierType) {
		Object.assign(this, config);
		this.id = uuid();
	}
}
