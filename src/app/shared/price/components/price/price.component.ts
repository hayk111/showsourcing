import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Price, Currency } from '~core/erm';

@Component({
	selector: 'price-app',
	templateUrl: './price.component.html',
	styleUrls: ['./price.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceComponent {

	private _price: Price;
	@Input() set price(price: Price) {
		this._price = price;
	}

	get price(): Price {
		return this._price;
	}

	@Input() moq: number;
	@Input() moqDesc: string;

	@Input() size: 's' | 'ms' | 'm' | 'l' = 'm';

	get currency(): string {
		return this._price.currency || null;
	}

	get value(): number {
		return this._price.value || null;
	}
}
