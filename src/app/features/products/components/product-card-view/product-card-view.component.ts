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
export class ProductCardViewComponent {
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
	trackByFn = (index, item) => item.id;


	selectProduct(id: string) {
		this.productSelect.emit(id);
	}

}
