import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Patch } from '~app/entity';
import { Product, ProductStatus } from '../../store/product/product.model';

@Component({
	selector: 'product-selectable-card-app',
	templateUrl: './product-selectable-card.component.html',
	styleUrls: ['./product-selectable-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSelectableCardComponent implements OnInit {
	@Input() product: Product;
	@Input() selected: boolean;
	@Input() statuses: Array<ProductStatus> = [];
	@Output() productSelect = new EventEmitter<string>();
	@Output() productDelete = new EventEmitter<string>();
	@Output() productUnselect = new EventEmitter<string>();
	@Output() productOpen = new EventEmitter<string>();
	@Output() productFavorited = new EventEmitter<string>();
	@Output() productUnfavorited = new EventEmitter<string>();
	@Output() productVote = new EventEmitter<{ id: string; value: number }>();
	@Output() addToProject = new EventEmitter<string>();
	@Output() update = new EventEmitter<Patch>();

	public showOverlay = false;

	constructor() { }

	ngOnInit() { }

	onRateClick() {
		if (this.product.favorite)
			this.productUnfavorited.emit(this.product.id);
		else
			this.productFavorited.emit(this.product.id);
	}

	onVote(value) {
		this.productVote.emit({ id: this.product.id, value });
	}

	setOverlay(value: boolean) {
		this.showOverlay = value;
	}

	onStatusUpdate(newStatus: string) {
		this.update.emit({ propName: 'status', value: newStatus, id: this.product.id });
	}
}
