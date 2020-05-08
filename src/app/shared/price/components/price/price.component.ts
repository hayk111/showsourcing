import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Price, Currency } from '~core/erm';

@Component({
	selector: 'price-app',
	templateUrl: './price.component.html',
	styleUrls: ['./price.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceComponent {

	private _currency: string;
	@Input() set currency(currency: string) {
		this._currency = currency;
	}

	@Input() price: Price;
	@Input() moq: number;
	@Input() moqDesc: string;

	@Input() size: 's' | 'ms' | 'm' | 'l' = 'm';

	get currency(): string {
		return this._currency || null;
	}
}
