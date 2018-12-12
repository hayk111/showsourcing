import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Currency } from '~core/models';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlight.ablecomponent';

@Component({
	selector: 'selector-currency-row-app',
	templateUrl: './selector-currency-row.component.html',
	styleUrls: ['./selector-currency-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorCurrencyRowComponent extends AbstractSelectorHighlightableComponent {

	@Input() currency: Currency;

	constructor() { super(); }

	getLabel() {
		return this.currency.id;
	}

}
