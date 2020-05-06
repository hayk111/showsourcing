import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '~core/erm3';
import { TrackingComponent } from '~utils/tracking-component';
import { Size } from '~utils';

@Component({
	selector: 'comment-list-app',
	templateUrl: './comment-list.component.html',
	styleUrls: ['./comment-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent extends TrackingComponent implements OnInit {

	@Input() order: 'asc' | 'desc' = 'asc';
	@Input() hasViewMore = true;
	@Input() comments: Comment[];
	/** amount of comments we display at first and when we show more*/
	@Input() amountViewMore = 2;
	@Input() sizeLogo: Size = 'xl';

	@Output() addComment = new EventEmitter<null>();
	@Output() deleted = new EventEmitter<Comment>();
	/** index to keep track of which comments we display */
	amountShown = 0;

	constructor() {
		super();
	}

	ngOnInit() {
		this.comments = this.order === 'asc' ? this.comments : this.comments.reverse();
		if (this.comments && this.comments.length > 0) {
			this.amountShown = this.comments.length;
			this.showMore();
		}
	}

	/** index gets decreased by 2, this way each time we call this function, we
	 * will be able to see 2 more items until the index is 0
	 */
	showMore() {
		this.amountShown = this.amountShown >= this.amountViewMore ? this.amountShown - this.amountViewMore : 0;
	}
}
