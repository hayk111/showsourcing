import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'price-app',
	templateUrl: './price.component.html',
	styleUrls: ['./price.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceComponent implements OnInit {
	@Input() big = false;
	@Input() currency: string;
	@Input() amount: number;

	constructor() {}

	ngOnInit() {}
}
