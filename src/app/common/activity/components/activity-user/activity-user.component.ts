import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { User } from '~core/orm/models/user.model';
import { Product } from '~core/orm/models';

@Component({
	selector: 'activity-user-app',
	templateUrl: './activity-user.component.html',
	styleUrls: ['./activity-user.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex'
	}
})
export class ActivityUserComponent implements OnInit {
	@Output() previewClick = new EventEmitter<Product>();
	@Input() hasPreview = false;
	@Input() product: Product;
	@Input() user: User;
	@Input() action: string;
	@Input() time: string;

	constructor() { }

	ngOnInit() {
	}

}
/*
Using in :
- flat-feed-card.component
- multiple-products-activity-card
- one-product-activity-card

*/
