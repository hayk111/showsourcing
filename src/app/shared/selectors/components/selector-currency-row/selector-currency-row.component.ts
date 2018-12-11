import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { Currency } from '~core/models';
import { Highlightable } from '@angular/cdk/a11y';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/asbtract-selector-highlight.ablecomponent';

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
		return this.currency.symbol;
	}

}
