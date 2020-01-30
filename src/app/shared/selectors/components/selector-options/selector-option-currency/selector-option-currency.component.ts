import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Currency } from '~core/ORM/models';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlightable.component';

@Component({
	selector: 'selector-option-currency-app',
	templateUrl: './selector-option-currency.component.html',
	styleUrls: ['./selector-option-currency.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorOptionCurrencyComponent extends AbstractSelectorHighlightableComponent {

	@Input() currency: Currency;

	constructor() { super(); }

	getLabel() {
		return this.currency.symbol;
	}

	getItem() {
		return this.currency;
	}

}
