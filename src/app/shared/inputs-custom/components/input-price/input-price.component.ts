import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	Output,
	ViewChild,
} from '@angular/core';
import { Price } from '~models/price.model';
import { AbstractInput, InputDirective, makeAccessorProvider } from '~shared/inputs';

@Component({
	selector: 'input-price-app',
	templateUrl: './input-price.component.html',
	styleUrls: ['./input-price.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(InputPriceComponent)]
})
export class InputPriceComponent extends AbstractInput {

	@Input() disabled = false;
	@Input() canFocus = false;
	@Output() change = new EventEmitter();
	@Output() blur = new EventEmitter();

	@ViewChild(InputDirective, { static: true }) inp: InputDirective;

	currencySelectorShown: boolean;

	private _price: Price;
	@Input()
	set price(price: Price) {
		if (price)
			this._price = { ...price };
		else
			this._price = new Price({ value: 0, currency: 'USD' });
	}
	get price() { return this._price; }

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	select() {
		this.inp.select();
	}

	onChange() {
		this.onChangeFn(this.price);
		this.change.emit(this.price);
	}

	writeValue(value: any): void {
		if (value === null)
			return;
		this.price = value;
		this.cd.markForCheck();
	}

	onCurrencyChange(item?) {
		if (item) this.price = { ...this.price, currency: item };
		this.hideCurrencySelector();
		this.onChange();
		this.blur.emit();
	}

	onBlur() {
		this.onTouchedFn();
		this.blur.emit();
		// prevent view changed after it was checked error
		this.cd.detectChanges();
	}

	showCurrencySelector() {
		this.currencySelectorShown = true;
	}

	hideCurrencySelector() {
		this.currencySelectorShown = false;
	}

	get amount() {
		return this.price && this.price.value ? this.price.value / 10000 : 0;
	}

	set amount(amount: any) {
		amount = amount.replace(',', '.');
		this.price.value = amount * 10000;
	}

	get currency() {
		return this.price && this.price.currency ? this.price.currency : 'USD';
	}

	set currency(currencyId: string) {
		this.price.currency = currencyId;
	}

	focus() {
		this.inp.focus();
	}
}
