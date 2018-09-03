import { uuid } from '~utils/uuid.utils';


export class SupplierType {
	id?: string;
	name?: string;
	deleted?= false;
	__typename?= 'SupplierType';


	constructor(config: SupplierTypeConfig) {
		Object.assign(this, config);
		this.id = uuid();
	}
}

export interface SupplierTypeConfig {
	name: string;
}
