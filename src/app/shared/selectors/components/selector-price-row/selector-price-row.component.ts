import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'selector-price-row-app',
	templateUrl: './selector-price-row.component.html',
	styleUrls: ['./selector-price-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorPriceRowComponent implements OnInit {

	@Input() currency: string;
	@Input() abreviation: string;

	constructor() { }

	ngOnInit() {
	}

}
