import { ChangeDetectionStrategy, Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ListViewComponent } from '~core/list-page';
import { Product } from '~core/models';

@Component({
	selector: 'supplier-products-card-view-app',
	templateUrl: './supplier-products-card-view.component.html',
	styleUrls: ['./supplier-products-card-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierProductsCardViewComponent extends ListViewComponent<Product> implements OnInit {

	@Output() liked = new EventEmitter<Product>();
	@Output() disliked = new EventEmitter<Product>();
	@Output() update = new EventEmitter<Product>();

	constructor() { super(); }

	ngOnInit() {
	}

}
