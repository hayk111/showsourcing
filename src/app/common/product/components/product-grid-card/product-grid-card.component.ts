import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '~core/models';

@Component({
	selector: 'product-grid-card-app',
	templateUrl: './product-grid-card.component.html',
	styleUrls: ['./product-grid-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGridCardComponent implements OnInit {

	@Input() product: Product;
	@Input() selected: boolean;
	@Input() hasCheckbox = true;
	@Output() open = new EventEmitter<null>();
	@Output() preview = new EventEmitter<null>();
	@Output() select = new EventEmitter<null>();
	@Output() unselect = new EventEmitter<null>();
	@Output() favorited = new EventEmitter<null>();
	@Output() unfavorited = new EventEmitter<null>();
	@Output() liked = new EventEmitter<null>();
	@Output() disliked = new EventEmitter<null>();
	@Output() update = new EventEmitter<Product>();

	constructor() { }

	ngOnInit() {
	}

}
