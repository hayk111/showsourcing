import { ChangeDetectionStrategy, Component, Input, ViewChild, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Price } from '~core/erm3';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { InputDirective } from '~shared/inputs/components-directives';
import * as _ from 'lodash';

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
			this.valueTemp.value = this.processValue(this.valueTemp.value.toString());
			return this.valueTemp;
		} else {
			return null;
		}
	}

	get currency() {
		return typeof this.valueTemp?.currency === 'object' ? this.valueTemp.currency?.code : this.valueTemp.currency;
	}

	valueTemp: Price = {};
	@Input() hasLabel = false;
	/** whether the input has borders */
	@Input() inline = false;
	@Input() dynamicInput = false;
	@Output() saved = new EventEmitter<void>();

	@ViewChild(InputDirective) amountInp: InputDirective;
	focussed = false;

	onFocusValue: Price;

	constructor() {
		super();
	}

	focus() {
		this.amountInp.select();
	}

	/**
	 * removes extra dots if they exist in price value
	 * @param value: value to be processed
	 */
	private processValue(value: string): number {
		return Number(value.replace( /^([^.]*\.)(.*)$/, function ( a, b, c ) {
				return b + c.replace( /\./g, '' );
		}));
	}

	update(ev) {
		console.log('InputPriceComponent -> update -> ev', ev);
	}

	onFocus() {
		this.focussed = true;
		this.onFocusValue = {...this.valueTemp};
	}

	onSave(value) {
		this.focussed = false;
		this.onTouchedFn();
		if (_.isEqual(this.onFocusValue, this.valueTemp)) {
			return;
		}
		this.onChangeFn(value);
		this.saved.emit(value);
	}

}
