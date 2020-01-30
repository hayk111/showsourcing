import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Price } from '~core/erm';

@Component({
	selector: 'price-app',
	templateUrl: './price.component.html',
	styleUrls: ['./price.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceComponent {

	@Input() price: Price;
	@Input() moq: number;
	@Input() moqDesc: string;

	@Input() size: 's' | 'ms' | 'm' | 'l' = 'm';

	get amount() {
		return this.price ? this.price.value : undefined;
	}

	get currency() {
		return this.price ? this.price.currency : undefined;
	}
}
