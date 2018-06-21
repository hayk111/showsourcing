import { uuid } from '~utils';


export class Packaging {
	id?: string;
	height?: number;
	width?: number;
	length?: number;
	unit?: string;
	itemsQuantity?: number;
	weight?: number;
	weightUnit?: string;
	constructor(config?: PackagingConfig) {
		this.id = uuid();
		this.unit = 'cm';
		Object.assign(this, config);
	}
}

export interface PackagingConfig {
	height?: number;
	width?: number;
	length?: number;
	unit?: string;
	itemsQuantity?: number;
	weight?: number;
	weightUnit?: string;
}
