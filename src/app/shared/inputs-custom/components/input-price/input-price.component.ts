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
import { EditableTextComponent } from '~shared/editable-field/components/editable-text/editable-text.component';
import { AbstractInput, makeAccessorProvider, InputDirective } from '~shared/inputs';
import { SelectorConstComponent } from '~shared/selectors/components/selector-const/selector-const.component';

@Component({
	selector: 'input-price-app',
	templateUrl: './input-price.component.html',
	styleUrls: ['./input-price.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(InputPriceComponent)]
})
export class InputPriceComponent extends AbstractInput {
	@Output() change = new EventEmitter();
	@Output() blur = new EventEmitter();
	@ViewChild(SelectorConstComponent) currencySelector: SelectorConstComponent;
	@ViewChild(InputDirective) inp: InputDirective;
	currencySelectorShown: boolean;

	private _price: Price = new Price({ value: 0, currency: 'USD' });
	@Input()
	set price(price: Price) { if (price) this._price = { ...price }; }
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

	onCurrencyChange() {
		this.hideCurrencySelector();
		this.onChange();
	}

	onBlur() {
		this.onTouchedFn();
		this.blur.emit();
	}

	showCurrencySelector() {
		this.currencySelectorShown = true;
		setTimeout(_ => this.currencySelector.open());
	}

	hideCurrencySelector() {
		this.currencySelectorShown = false;
	}

	get amount() {
		return this.price.value / 10000;
	}

	set amount(amount: number) {
		this.price.value = amount * 10000;
	}

	get currency() {
		return this.price.currency;
	}

	set currency(currencyId: string) {
		this.price.currency = currencyId;
	}
}
