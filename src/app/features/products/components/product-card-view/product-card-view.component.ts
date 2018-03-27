import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { Patch, Product, ProductStatus } from '~app/entity';

@Component({
	selector: 'product-card-view-app',
	templateUrl: './product-card-view.component.html',
	styleUrls: ['./product-card-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardViewComponent implements OnInit {
	@Output() productSelect = new EventEmitter<string>();
	@Output() productUnselect = new EventEmitter<string>();
	@Output() productOpen = new EventEmitter<string>();
	@Output() productDelete = new EventEmitter<string>();
	@Output() productFavorited = new EventEmitter<string>();
	@Output() productUnfavorited = new EventEmitter<string>();
	@Output() productVote = new EventEmitter<{ id: string; value: number }>();
	@Output() addToProject = new EventEmitter<string>();
	@Output() update = new EventEmitter<Patch>();
	@Input() products: Array<Product> = [];
	@Input() selection: any;
	@Input() statuses: Array<ProductStatus>;

	// TODO: cedric (from cedric)
	// this should be a container and not tied to products-page view
	// this way when we do a sorting on list view it doesn't affect this view.
	constructor() { }

	ngOnInit() { }

	selectProduct(id: string) {
		this.productSelect.emit(id);
	}

	trackByFn(index, product) {
		return product.id;
	}
}
