import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Price } from '~models';

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

	get amount() {
		return this.price ? this.price.value : undefined;
	}

	get currency() {
		return this.price ? this.price.currency : undefined;
	}
}
