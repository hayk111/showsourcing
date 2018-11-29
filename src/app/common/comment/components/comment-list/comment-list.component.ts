import { Component, OnInit, ChangeDetectionStrategy, Input, AfterViewInit } from '@angular/core';
import { Comment } from '~models';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'comment-list-app',
	templateUrl: './comment-list.component.html',
	styleUrls: ['./comment-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent extends TrackingComponent implements OnInit {

	@Input() comments: Comment[];
	/** index to keep track of which comments we display */
	indexShow = 0;

	constructor() {
		super();
	}

	ngOnInit() {
		if (this.comments && this.comments.length > 0) {
			this.indexShow = this.comments.length;
			this.showMore();
		}
	}

	/** index gets decreased by 2, this way each time we call this function, we
	 * will be able to see 2 more items until the index is 0
	 */
	showMore() {
		this.indexShow = this.indexShow >= 2 ? this.indexShow - 2 : 0;
	}

}
