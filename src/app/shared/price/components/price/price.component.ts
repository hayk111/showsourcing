import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
} from '@angular/core';
import { Currency } from '~app/entity';

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
	// price are 10000 times less than what comes back from the server
	// @input in setter
	private _amount: number;

	constructor() { }

	ngOnInit() { }

	@Input()
	get amount() {
		return this._amount;
	}

	set amount(v: number) {
		this._amount = v / 10000;
	}

	get styles() {
		return {
			'font-weight': this.fontWeight,
			'font-size':
				this.size === 'inherit' ? 'inherit' : 'var(--font-size-' + this.size + ')',
		};
	}
}
