
export class SupplierStatus {
	id?: string;
	name?: string;
	inWorkflow?: boolean;
	category?: string;
	step?: number;

	constructor(config: SupplierStatus) {
		Object.assign(this, config);
	}
}

export interface SupplierStatusConfig {
	id: string;
}
