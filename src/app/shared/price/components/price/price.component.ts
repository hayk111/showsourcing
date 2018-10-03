import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
} from '@angular/core';
import { Currency } from '~models';

@Component({
	selector: 'price-app',
	templateUrl: './price.component.html',
	styleUrls: ['./price.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceComponent implements OnInit {

	@Input() big = false;
	@Input() currency: Currency;
	@Input() fontWeight = 'inherit';
	@Input() size = 'inherit';
	@Input() get amount() {
		return this._amount;
	}

	private _amount: number;

	constructor() { }

	ngOnInit() { }

	set amount(v: number) {
		this._amount = v;
	}

	get styles() {
		return {
			'font-weight': this.fontWeight,
			'font-size':
				this.size === 'inherit' ? 'inherit' : 'var(--font-size-' + this.size + ')',
		};
	}
}
