import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '~models';

@Component({
	selector: 'product-grid-card-app',
	templateUrl: './product-grid-card.component.html',
	styleUrls: ['./product-grid-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGridCardComponent implements OnInit {

	@Input() product: Product;
	@Input() selected: boolean;
	@Output() productSelect = new EventEmitter<string>();
	@Output() productUnselect = new EventEmitter<string>();
	@Output() productFavorite = new EventEmitter<null>();
	@Output() productUnfavorite = new EventEmitter<null>();
	@Output() productLike = new EventEmitter<boolean>();
	@Output() productDislike = new EventEmitter<boolean>();
	@Output() addToProject = new EventEmitter<null>();

	showOptionsBar = false;

	constructor() { }

	ngOnInit() {
	}

	setShowOptionsBar(b: boolean) {
		this.showOptionsBar = b;
	}

}
