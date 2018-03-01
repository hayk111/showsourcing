import { Component } from '@angular/core';
import { entityRepresentationMap } from '~entity';
import { deepCopy } from '~utils';

import { AbstractInput, makeAccessorProvider } from '../../../inputs/abstract-input.class';

@Component({
	selector: 'input-price-app',
	templateUrl: './input-price.component.html',
	styleUrls: ['./input-price.component.scss'],
	providers: [makeAccessorProvider(InputPriceComponent)],
})
export class InputPriceComponent extends AbstractInput {
	currencyRep = entityRepresentationMap.currencies;

	constructor() {
		super();
	}

	onUpdate(value, field) {
		// idk what the fuck is going on, this seems to work tho...
		if (!this.value) this.value = {};
		else this.value = deepCopy(this.value);
		this.value[field] = value;
		this.onChange(this.value);
	}
}
