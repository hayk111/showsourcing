import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'price-page-app',
	templateUrl: './price-page.component.html',
	styleUrls: ['./price-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricePageComponent {
	priceMatrix = [{ value: 3, currency: 'USD' }];
}
