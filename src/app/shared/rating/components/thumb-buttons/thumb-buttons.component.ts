import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AutoUnsub } from '~utils';
import { ChangeDetectionStrategy } from '@angular/core';
import { ProductVote, Product } from '~models';
import { UserService } from '~global-services';
import { ProductVoteService } from '~global-services/product-vote/product-vote.service';
import { thumbAnimation } from '~shared/rating/components/thumb-buttons/animation';

@Component({
	selector: 'thumb-buttons-app',
	templateUrl: './thumb-buttons.component.html',
	styleUrls: ['./thumb-buttons.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: thumbAnimation
})
export class ThumbButtonsComponent extends AutoUnsub implements OnInit {
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
	// we only use this if we want to update multiple products
	@Input() products: Product[];
	@Output() vote = new EventEmitter<ProductVote[]>();
	@Output() multipleVote = new EventEmitter<Map<string, ProductVote[]>>();
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
		if (this.userVote && !this.products)
			this.userVote.value === 100 ? this.like = true : this.dislike = true;
	}


	singleClick() {
		if (!this.userVote)
			this.createEmitVote();
		else
			this.updateEmitVote();
	}

	thumbUp() {
		if (this.like) { // if we click over the active like we have to delete the vote
			this.like = false;
			if (this.products)
				this.deleteMultipleVotes();
			else
				this.voteSrv.deleteOne(this.userVote.id).subscribe();
		} else {
			this.like = true;
			if (!this.dislike) { // if it was false already it means that we have to create a new vote
				if (this.products)
					this.createEmitMultipleVotes(true);
				else
					this.createEmitVote(true);
			} else {
				this.dislike = false;
				if (this.products)
					this.updateEmiteMultipleVotes();
				else
					this.updateEmitVote();
			}
		}
	}

	thumbDown() {
		if (this.dislike) { // if we click over the active dislike we have to delete the vote
			this.dislike = false;
			if (this.products)
				this.deleteMultipleVotes();
			else
				this.voteSrv.deleteOne(this.userVote.id).subscribe();
		} else {
			this.dislike = true;
			if (!this.like) {// if it was false already it means that we have to create a new vote
				if (this.products)
					this.createEmitMultipleVotes(false);
				else
					this.createEmitVote(false);
			} else {
				this.like = false;
				if (this.products)
					this.updateEmiteMultipleVotes();
				else
					this.updateEmitVote();
			}
		}
	}

	deleteMultipleVotes() {
		const userIds = [];
		this.products.forEach(prod => {
			const voteUser = (prod.votes || []).find(v => v.user.id === this.userSrv.userSync.id);
			if (voteUser)
				userIds.push(voteUser.id);
		});
		this.voteSrv.deleteMany(userIds);
	}

	createEmitVote(state: boolean = true) {
		const vote = new ProductVote({
			value: state ? 100 : 0,
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

	createEmitMultipleVotes(state: boolean = true) {
		const mapVotes = new Map();
		this.products.forEach(prod => {
			let voteUser = (prod.votes || []).find(v => v.user.id === this.userSrv.userSync.id);
			if (voteUser) // if te vote already exists set it to the current state value
				voteUser.value = state ? 100 : 0;
			else { // we create a new vote
				voteUser = new ProductVote({
					value: state ? 100 : 0,
					user: { id: this.userSrv.userSync.id }
				});
				[...prod.votes, voteUser]
			}
			mapVotes.set(voteUser.id, [...prod.votes, voteUser]);
		});
		this.multipleVote.emit(mapVotes);
	}

	updateEmiteMultipleVotes() {
		const mapVotes = new Map();
		this.products.forEach(prod => {
			const voteUser = (prod.votes || []).find(v => v.user.id === this.userSrv.userSync.id);
			voteUser.value = voteUser.value === 100 ? 0 : 100;
			mapVotes.set(voteUser.id, voteUser);
		});
	}

	get state() {
		let val: string;
		if (!this.userVote)
			val = 'none';
		else
			val = this.userVote.value === 100 ? 'up' : 'down';
		return val;
	}

}
