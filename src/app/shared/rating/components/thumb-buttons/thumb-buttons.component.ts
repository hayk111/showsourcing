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
	// when we want the color of the thumb be the background isntead of the icon
	@Input() reverse = false;
	// we can have 2 status for each thumb when not single
	// both status can be false at the same time, but they can't be true at the same time
	like = false;
	dislike = false;
	private _votes: ProductVote[];

	userVote: ProductVote;

	constructor(
		private userSrv: UserService,
		private voteSrv: ProductVoteService) {
		super();
	}

	ngOnInit() {
		if (this.userVote)
			this.userVote.value === 100 ? this.like = true : this.dislike = true;
	}


	singleClick() {
		if (!this.userVote)
			this.createEmitVote();
		else this.updateEmitVote();
	}

	thumbUp() {
		if (this.like) { // if we click over the active like we have to delete the vote
			this.like = false;
			this.voteSrv.deleteOne(this.userVote.id).subscribe();
		} else {
			this.like = true;
			if (!this.dislike) // if it was false already it means that we have to create a new vote
				this.createEmitVote();
			else {
				this.dislike = false;
				this.updateEmitVote();
			}
		}
	}

	thumbDown() {
		if (this.dislike) { // if we click over the active dislike we have to delete the vote
			this.dislike = false;
			this.voteSrv.deleteOne(this.userVote.id).subscribe();
		} else {
			this.dislike = true;
			if (!this.like) // if it was false already it means that we have to create a new vote
				this.createEmitVote();
			else {
				this.like = false;
				this.updateEmitVote();
			}
		}
	}

	createEmitVote() {
		const vote = new ProductVote({
			value: 100,
			user: { id: this.userSrv.userSync.id }
		});
		this.voteSrv.create(vote).subscribe(newVote => {
			this.vote.emit([...this.votes, newVote]);
		});
	}

	updateEmitVote() {
		this.userVote.value = this.userVote.value === 100 ? 0 : 100;
		this.vote.emit(this._votes);
	}

	get state() {
		let val: string;
		if (!this.userVote)
			val = 'none';
		else val = this.userVote.value === 100 ? 'up' : 'down';
		return val;
	}

}
