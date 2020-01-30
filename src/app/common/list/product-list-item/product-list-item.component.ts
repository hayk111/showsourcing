import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '~core/ORM/models';

@Component({
	selector: 'product-list-item-app',
	templateUrl: './product-list-item.component.html',
	styleUrls: ['./product-list-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListItemComponent {
	@Input() product: Product;
}
