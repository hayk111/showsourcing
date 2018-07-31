import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AutoUnsub } from '~utils';
import { ChangeDetectionStrategy } from '@angular/core';
import { ProductVote } from '~models';
import { UserService } from '~global-services';
import { ProductVoteService } from '~global-services/product-vote/product-vote.service';
import { thumbAnimation } from './animation';

@Component({
	selector: 'thumb-buttons-app',
	templateUrl: './thumb-buttons.component.html',
	styleUrls: ['./thumb-buttons.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: thumbAnimation
})
export class ThumbButtonsComponent extends AutoUnsub implements OnInit {
	@Output() vote = new EventEmitter<ProductVote[]>();
	/** whether we display two thumbs or just one */
	@Input() single = true;
	/** list of all votes */
	@Input() set votes(votes: ProductVote[]) {
		this.userVote = (votes || []).find(v => v.user.id === this.userSrv.userSync.id);
		this._votes = votes;
	}
	get votes() {
		return this._votes;
	}
	@Input() size = 's';
	// we can have 2 status for each thumb
	// both status can be false at the same time, but they can't be true at the same time
	@Input() like = false;
	@Input() dislike = false;
	private _votes: ProductVote[];

	userVote: ProductVote;

	constructor(
		private userSrv: UserService,
		private voteSrv: ProductVoteService) {
		super();
	}

	ngOnInit() {
	}

	// onClick() {
	// 	if (!this.userVote) {
	// 		const vote = new ProductVote({
	// 			value: 100,
	// 			user: { id: this.userSrv.userSync.id }
	// 		});
	// 		this.voteSrv.create(vote).subscribe(newVote => {
	// 			this.vote.emit([...this.votes, newVote]);
	// 		});
	// 	} else {
	// 		this.userVote.value = this.userVote.value === 100 ? 0 : 100;
	// 		this.vote.emit(this._votes);
	// 	}
	// }

	singleClick() {
		if (!this.userVote) { // !this.like && !this.dislike
			this.like = true;
			// const vote = new ProductVote({
			// 	value: 100,
			// 	user: { id: this.userSrv.userSync.id }
			// });
			// this.voteSrv.create(vote).subscribe(newVote => {
			// 	this.vote.emit([...this.votes, newVote]);
			// });
		} else {
			this.like ? this.thumbDown() : this.thumbUp();
		}
	}

	thumbUp() {
		if (this.like) {
			this.like = false;
			// emit delete vote
		} else {
			this.like = true;
			this.dislike = false;
			console.log(this.userVote);
			// this.emitVote();
			// emite update vote
		}
	}

	thumbDown() {
		if (this.dislike) {
			this.dislike = false;
			// emit delete vote
		} else {
			this.dislike = true;
			this.like = false;
			console.log(this.userVote);
			// this.emitVote();
			// emit updatevote
		}
	}

	emitVote() {
		this.userVote.value = this.userVote.value === 100 ? 0 : 100;
		this.vote.emit(this._votes);
	}

	get state() {
		if (!this.userVote)
			return 'none';
		return this.userVote.value === 100 ? 'up' : 'down';
	}

}
