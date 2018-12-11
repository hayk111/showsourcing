import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'selector-currency-row-app',
	templateUrl: './selector-currency-row.component.html',
	styleUrls: ['./selector-currency-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorCurrencyRowComponent implements OnInit {

	@Input() currency: string;

	constructor() { }

	ngOnInit() {
	}

}
