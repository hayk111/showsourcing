import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vote } from '~shared/rating/services/rating.service';

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
	/** if we are liking/disliking multiple products */
	@Input() multiple = false;
	@Input() votes: Vote[];
	@Input() buttonName: string;
	/** whether we display the heart or not */
	@Input() hasHeart = true;
	/** we only use this one when we want to update multiple likes */
	@Output() onFavorite = new EventEmitter<null>();
	@Output() onUnfavorite = new EventEmitter<null>();
	@Output() buttonClick = new EventEmitter<null>();
	/** this is only used when selecting multiple products */
	@Output() liked = new EventEmitter<boolean>();
	@Output() disliked = new EventEmitter<boolean>();

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
- my-workflow-page
- one-product-activity-card
- product-grid
- projects-page

*/
