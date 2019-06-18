import { uuid } from '~utils';


export class Price {
	id?: string;
	currency?= 'USD';
	value?: number;
	baseCurrencyValue?: number;
	__typename?= 'Price';


	constructor(config: PriceConfig) {
		this.id = uuid();
		Object.assign(this, config);
	}
}

export interface PriceConfig {
	currency?: string;
	value?: number;
	baseCurrencyValue?: number;
}
