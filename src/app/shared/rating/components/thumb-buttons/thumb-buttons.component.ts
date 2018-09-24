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
	@Input() single = false;
	/** whether we display text besides the buttons or not */
	@Input() hasText = false;
	/** list of all votes */
	@Input() set votes(votes: ProductVote[]) {
		this.userVoteIndex = (votes || []).findIndex(v => v.user.id === this.userSrv.userSync.id);
		if (~this.userVoteIndex)
			this.userVote = votes[this.userVoteIndex];
		this._votes = votes || [];
	}
	get votes() {
		return this._votes;
	}
	userVoteIndex: number;

	@Input() size = 's';
	// when we want the color of the thumb be the background isntead of the icon
	@Input() reverse = false;
	// we only use this if we want to update multiple products
	@Input() products: Product[];
	@Output() vote = new EventEmitter<ProductVote[]>();
	// this is only used when selecting multiple products Map<Product.id, ProductVote[]>
	@Output() multipleVotes = new EventEmitter<Map<string, ProductVote[]>>();
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

	/** When we click on thumbs up to like a product */
	thumbUp() {

		// if we are giving like and we already had a like, we had to delete the vote
		if (this.like) {
			this.like = false;
			if (this.products) // if we are doing it with multiple likes
				this.deleteMultipleVotes();
			else
				this.deleteEmitVote();
		} else { // this case is when we have no like and we want to create or update one
			this.like = true;
			// if the dislike is false that means we are creating a vote, since both buttons where false that means that we havent clicked
			if (!this.dislike) {
				// if we are doing it with multiple likes we have to create multiple
				if (this.products)
					this.createEmitMultipleVotes(true);
				else
					this.createEmitVote(true);
			} else { // this case is when we are giving a like but we had a dislike, so we have to update the vote
				this.dislike = false;
				// if we are doing it with multiple likes we have to update multiple
				if (this.products)
					this.updateEmiteMultipleVotes(true);
				else
					this.updateEmitVote();
			}
		}
	}

	/** Same explanation as with thumbUp() just when we dislike */
	thumbDown() {
		if (this.dislike) { // if we click over the active dislike we have to delete the vote
			this.dislike = false;
			if (this.products)
				this.deleteMultipleVotes();
			else
				this.deleteEmitVote();
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
					this.updateEmiteMultipleVotes(false);
				else
					this.updateEmitVote();
			}
		}
	}

	createEmitVote(state: boolean = true) {
		const vote = new ProductVote({
			value: state ? 100 : 0,
			user: {
				id: this.userSrv.userSync.id,
				firstName: this.userSrv.userSync.firstName,
				lastName: this.userSrv.userSync.lastName,
				avatar: this.userSrv.userSync.avatar,
				__typename: 'User'
			}
		});
		this.vote.emit([...this.votes, vote]);
	}

	updateEmitVote() {
		const value = (!this.userVote || this.userVote.value === 100) ? 0 : 100;
		this.userVote = { ...this.userVote, value };
		this._votes = [...this._votes];
		this._votes[this.userVoteIndex] = this.userVote;
		this.vote.emit(this._votes);
	}

	deleteEmitVote() {
		this.voteSrv.delete(this.userVote.id).subscribe();
		this.vote.emit(this._votes.filter(vote => vote.id !== this.userVote.id)); // we do this to activate chagne detection on the product
	}

	/** create a vote given a status (like/dislike) and return it */
	createVote(state: boolean) {
		const tempVote = new ProductVote({
			value: state ? 100 : 0,
			user: {
				id: this.userSrv.userSync.id,
				firstName: this.userSrv.userSync.firstName,
				lastName: this.userSrv.userSync.lastName,
				avatar: this.userSrv.userSync.avatar,
				__typename: 'User'
			}
		});
		this.voteSrv.create(tempVote).subscribe();
		return tempVote;
	}

	/** create multiple votes given an array of products */
	createEmitMultipleVotes(state: boolean = true) {
		const mapVotes = new Map();
		this.products.forEach(prod => {
			let voteUser = (prod.votes || []).find(v => v.user.id === this.userSrv.userSync.id);
			if (voteUser) {// if the vote already exists set it to the current state value
				// since we can't replace an item on the array of objects because its sealed we create a new one
				// without the user vote that we are updating
				const votesUser = prod.votes.filter(vote => vote.id !== voteUser.id);
				const value = state ? 100 : 0;
				voteUser = { ...voteUser, value };
				votesUser.push(voteUser);
				mapVotes.set(prod.id, votesUser);
			} else { // else we create a new vote
				voteUser = this.createVote(state);
				mapVotes.set(prod.id, [...prod.votes, voteUser]);
			}
		});
		this.multipleVotes.emit(mapVotes);
	}

	/** update multiple votes given an array of products */
	updateEmiteMultipleVotes(state: boolean) {
		const mapVotes = new Map();
		this.products.forEach(prod => {
			let voteUser = (prod.votes || []).find(v => v.user.id === this.userSrv.userSync.id);
			if (voteUser) {
				// since we can't replace an item on the array of objects because its sealed we create a new one
				// without the user vote that we are updating
				const votesUser = prod.votes.filter(vote => vote.id !== voteUser.id);
				const value = voteUser.value === 100 ? 0 : 100;
				voteUser = { ...voteUser, value };
				votesUser.push(voteUser);
				mapVotes.set(prod.id, votesUser);
			} else { // we have to do this since we dont know when updating if the user has selected more products with no votes
				voteUser = this.createVote(state);
				mapVotes.set(prod.id, [...prod.votes, voteUser]);
			}
		});
		this.multipleVotes.emit(mapVotes);
	}

	/** delete multiple votes given an array of products */
	deleteMultipleVotes() {
		const mapVotes = new Map();
		const voteIds = [];
		this.products.forEach(prod => {
			const voteUser = (prod.votes || []).find(v => v.user.id === this.userSrv.userSync.id);
			if (voteUser) {// if the votes exist we add it to the array for deletion
				mapVotes.set(prod.id, []);
				voteIds.push(voteUser.id);
			}
		});
		voteIds.forEach(voteId => this.voteSrv.delete(voteId).subscribe());
		this.multipleVotes.emit(mapVotes); // we do this to activate change detection on the product
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
