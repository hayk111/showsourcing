import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '~core/models';
import { TrackingComponent } from '~utils';

@Component({
	selector: 'products-card-app',
	templateUrl: './products-card.component.html',
	styleUrls: ['./products-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsCardComponent extends TrackingComponent implements OnInit {

	@Input() products: Product[];
	@Output() addProducts = new EventEmitter<undefined>();
	@Output() viewAll = new EventEmitter<undefined>();

	constructor() { super(); }

	ngOnInit() {
	}

}
