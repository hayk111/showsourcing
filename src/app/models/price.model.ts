import { uuid } from '~utils';


export class Price {
	id?: string;
	currency ?= 'USD';
	value?: number;
	baseCurrencyValue?: number;

	constructor(config: PriceConfig) {
		Object.assign(this, config);
		this.id = uuid();
	}
}

export interface PriceConfig {
	currency?: string;
	value?: number;
}
