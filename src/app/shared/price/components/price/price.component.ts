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
	@Input() color: string;
	@Input() moqDesc: string;
	@Input() type: 'default' | 'primary' | 'primary-bold' = 'default';

	@Input() size: 's' | 'ms' | 'm' | 'l';

	computeColor() {
		if (this.color) {
			return 'var(--color-' + this.color + ')';
		}

		return this.type === 'default' ? 'var(--color-txt-primary)' : 'var(--color-primary)';
	}

	computeFontSize() {
		if (this.size) {
			return 'var(--font-size-' + this.size + ')';
		}

		return this.type === 'primary-bold' ? 'var(--font-size-l)' : 'var(--font-size-m)';
	}

	get amount() {
		return this.price ? this.price.value : undefined;
	}

	get currency() {
		return this.price ? this.price.currency : undefined;
	}
}
