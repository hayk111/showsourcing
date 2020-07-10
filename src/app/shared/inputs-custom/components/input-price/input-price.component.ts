import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { Price } from '~core/erm3';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { InputDirective } from '~shared/inputs/components-directives';

@Component({
	selector: 'input-price-app',
	templateUrl: './input-price.component.html',
	styleUrls: ['./input-price.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(InputPriceComponent)],
	host: {
		'[class.inline]': 'inline',
		'[class.readonly]': 'readonly',
		'[class.focussed]': 'focussed'
	}
})
export class InputPriceComponent extends AbstractInput {

	@Input()
	set value(value: Price) {
		this.valueTemp = value ? value : { value: null, currency: 'USD'};
	}
	get value() {
		// we want to return a value only if the amount (value.value)
		// is not null or undefined
		if (this.valueTemp.value != null) {
			return this.valueTemp;
		} else {
			return null;
		}
	}

	valueTemp: Price = {};
	@Input() hasLabel = false;
	/** whether the input has borders */
	@Input() inline = false;
	@ViewChild(InputDirective) amountInp: InputDirective;
	focussed = false;

	constructor() {
		super();
	}

	focus() {
		this.amountInp.focus();
	}

}
