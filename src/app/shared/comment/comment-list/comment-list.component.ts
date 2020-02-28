import { ChangeDetectionStrategy, Component, ChangeDetectorRef, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import { Comment } from '~core/erm';
import { TrackingComponent } from '~utils/tracking-component';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Size } from '~utils';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'comment-list-app',
	templateUrl: './comment-list.component.html',
	styleUrls: ['./comment-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('hoveredState', [
			state('true', style({ background: 'var(--color-secondary)'})),
			state('false', style({ background: 'transparent'})),
			transition('0 <=> 1', animate('1000ms ease'))
		])
	]
})
export class CommentListComponent extends TrackingComponent implements OnInit, AfterViewInit {

	@Input() order: 'asc' | 'desc' = 'asc';
	@Input() hasViewMore = true;
	private _comments: Comment[] = [];
	@Input()
	set comments(comments: Comment[]) {
		this._comments = (comments || []).filter(comment => comment.deleted === false);
	}
	get comments() {
		return this._comments;
	}
	/** amount of comments we display at first and when we show more*/
	@Input() amountViewMore = 2;
	@Input() sizeLogo: Size = 'xl';

	@Output() addComment = new EventEmitter<null>();

	hoveredState = true;
	commentId: string;
	/** index to keep track of which comments we display */
	amountShown = 0;

	constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.commentId = this.route.snapshot.params.comment;

		this.comments = this.order === 'asc' ? this.comments : this.comments.reverse();
		if (this.comments && this.comments.length > 0) {
			this.amountShown = this.comments.length;
			this.showMore();
		}
	}

	ngAfterViewInit() {
		if (this.commentId) {
			document.getElementById(this.commentId).scrollIntoView({ behavior: 'smooth' });

			setTimeout(_ => {
				this.hoveredState = false;
				this.cdr.detectChanges();
			}, 2000);
		}
	}

	/** index gets decreased by 2, this way each time we call this function, we
	 * will be able to see 2 more items until the index is 0
	 */
	showMore() {
		this.amountShown = this.amountShown >= this.amountViewMore ? this.amountShown - this.amountViewMore : 0;
	}

	getSecondAppearance(string, symbol) {
		return string.indexOf(symbol, string.indexOf(symbol) + 1);
 	}
}
