import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, AfterContentChecked } from '@angular/core';
import { Product, ERM } from '~core/models';
import { Status } from '~core/models/status.model';
@Component({
	selector: 'product-grid-card-app',
	templateUrl: './product-grid-card.component.html',
	styleUrls: ['./product-grid-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGridCardComponent implements OnInit, AfterContentChecked {

	prodERM = ERM.PRODUCT;
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

	getColor(status: Status) {
		if (!status)
			return '--color-txt-secondary';

		switch (status.category) {
			case 'inProgress':
				return '--color-primary';
			case 'validated':
				return '--color-success';
			case 'refused':
				return '--color-warn';
			default:
				return '--color-txt-secondary';
		}
	}

	ngAfterContentChecked() {
		console.log('TCL: ProductGridCardComponent -> ngAfterContentChecked -> this.product', this.product);
	}

}
