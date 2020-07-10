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

	// whether input text color is primary
	@Input() primary = true;

	@Input() size: 's' | 'ms' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' = 'm';

	get currency(): string {
		return this._price.currency || null;
	}

	get value(): number {
		return this._price.value || null;
	}
}
