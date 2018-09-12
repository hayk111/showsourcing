import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { ProductVote, Product } from '~models';

@Component({
	selector: 'action-bar-app',
	templateUrl: './action-bar.component.html',
	styleUrls: ['./action-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.isVisible]': 'isVisible'
	}
})
export class ActionBarComponent implements OnInit {

	/** when we need the action bar to be hidden and then displayed when an event occurs */
	@Input() isVisible = true;
	@Input() favorite = false;
	/** whether we display the like buttons or not */
	@Input() hasLikes = true;
	@Input() votes: ProductVote[];
	@Input() buttonName: string;
	/** we only use this one when we want to update multiple likes */
	@Input() products: Product[];
	@Output() onFavorite = new EventEmitter<null>();
	@Output() onUnfavorite = new EventEmitter<null>();
	@Output() vote = new EventEmitter<any>();
	@Output() buttonClick = new EventEmitter<null>();
	/** this is only used when selecting multiple products */
	@Output() multipleVotes = new EventEmitter<Map<string, ProductVote[]>>();

	constructor() { }

	ngOnInit() {

	}

}
/*
Using in :
- product-carousel
- product-preview
- products-page
- project-workflow
- supliers-page
- my-products-page
- one-product-activity-card
- product-grid

*/
