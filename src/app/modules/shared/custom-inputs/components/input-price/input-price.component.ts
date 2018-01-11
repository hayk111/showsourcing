import { Injector, Component, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormBuilder, FormGroup } from '@angular/forms';
import { AbstractInput, makeAccessorProvider } from '../../../inputs/abstract-input.class';
import { entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { deepCopy } from '../../../../store/utils/deep-copy.utils';


@Component({
	selector: 'input-price-app',
	templateUrl: './input-price.component.html',
	styleUrls: ['./input-price.component.scss'],
	providers: [ makeAccessorProvider(InputPriceComponent) ]
})
export class InputPriceComponent extends AbstractInput {
	currencyRep = entityRepresentationMap.currencies;

	constructor() {
		super();
	}

	onUpdate(value, field) {
		// idk what the fuck is going on, this seems to work tho...
		if (!this.value)
			this.value = {};
		else
			this.value = deepCopy(this.value);
		this.value[field] = value;
		this.onChange(this.value);
	}

}
