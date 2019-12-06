import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ERM, Product } from '~core/models';
import { Status } from '~core/models/status.model';
import { StatusUtils } from '~utils';

@Component({
	selector: 'product-grid-card-app',
	templateUrl: './product-grid-card.component.html',
	styleUrls: ['./product-grid-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGridCardComponent {

	@Input() product: Product;
	@Input() selected: boolean;
	@Input() hasCheckbox = true;
	@Input() hasHoverEffect = true;
	@Output() open = new EventEmitter<null>();
	@Output() preview = new EventEmitter<null>();
	@Output() select = new EventEmitter<null>();
	@Output() unselect = new EventEmitter<null>();
	@Output() favorited = new EventEmitter<null>();
	@Output() unfavorited = new EventEmitter<null>();
	@Output() liked = new EventEmitter<null>();
	@Output() disliked = new EventEmitter<null>();
	@Output() update = new EventEmitter<Product>();

	erm = ERM;
	statusUtils = StatusUtils;

	constructor() { }

}
