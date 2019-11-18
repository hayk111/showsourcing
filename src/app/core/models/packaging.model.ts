import { uuid } from '~utils';


export class Packaging {
	id?: string;
	height?: number;
	width?: number;
	length?: number;
	unit?: string;
	itemsQuantity?: number;
	weight?: number;
	depth?: number;
	weightUnit?: string;
	__typename ?= 'Packaging';

	constructor(config?: PackagingConfig) {
		this.unit = 'cm';
		this.weightUnit = 'kg';
		Object.assign(this, config);
		this.id = uuid();
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
