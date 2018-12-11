import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Currency } from '~core/models';

@Component({
	selector: 'selector-currency-row-app',
	templateUrl: './selector-currency-row.component.html',
	styleUrls: ['./selector-currency-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorCurrencyRowComponent implements OnInit {

	@Input() currency: Currency;

	constructor() { }

	ngOnInit() {
	}

}
