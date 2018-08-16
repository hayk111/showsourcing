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
		this.userVoteIndex = (votes || []).findIndex(v => v.user.id === this.userSrv.userSync.id);
		if (~this.userVoteIndex)
			this.userVote = votes[this.userVoteIndex];
		this._votes = votes;
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
		debugger;
		console.log('>> like ', this.like, '>> dislike: ', this.dislike);
		// if we are giving like and we already had a like, we had to delete the vote
		if (this.like) {
			this.like = false;
			if (this.products) // if we are doing it with multiple likes
				this.deleteMultipleVotes();
			else
				this.voteSrv.deleteOne(this.userVote.id).subscribe();
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
		debugger;
		console.log('>> like ', this.like, '>> dislike: ', this.dislike);
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
					this.updateEmiteMultipleVotes(false);
				else
					this.updateEmitVote();
			}
		}
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
		const value = this.userVote.value === 100 ? 0 : 100;
		this.userVote = { ...this.userVote, value };
		this._votes = [...this._votes];
		this._votes[this.userVoteIndex] = this.userVote;
		this.vote.emit(this._votes);
	}

	/** delete multiple votes given an array of products */
	deleteMultipleVotes() {
		const voteIds = [];
		this.products.forEach(prod => {
			const voteUser = (prod.votes || []).find(v => v.user.id === this.userSrv.userSync.id);
			console.log('>>votes on delete ', voteUser);
			if (voteUser) // if the votes exist we add it to the array for deletion
				voteIds.push(voteUser.id);
		});
		this.voteSrv.deleteMany(voteIds).subscribe();
	}

	/** create multiple votes given an array of products */
	createEmitMultipleVotes(state: boolean = true) {
		const mapVotes = new Map();
		this.products.forEach(prod => {
			let voteUser = (prod.votes || []).find(v => v.user.id === this.userSrv.userSync.id);
			console.log('>> votes on create ', voteUser);
			if (voteUser) {// if the vote already exists set it to the current state value
				const value = this.state ? 100 : 0;
				voteUser = { ...voteUser, value };
				mapVotes.set(prod.id, prod.votes);
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
			console.log('>> votes on update ', voteUser);
			if (voteUser) {
				const value = voteUser.value === 100 ? 0 : 100;
				voteUser = { ...voteUser, value };
				mapVotes.set(prod.id, prod.votes);
			} else { // we have to do this since we dont know when updating if the user has selected more products with no votes
				const tempVote = this.createVote(state);
				mapVotes.set(prod.id, [...prod.votes, tempVote]);
			}
		});
		this.multipleVotes.emit(mapVotes);
	}

	/** create a vote given a status (like/dislike) and return it */
	createVote(state: boolean) {
		const tempVote = new ProductVote({
			value: state ? 100 : 0,
			user: { id: this.userSrv.userSync.id }
		});
		this.voteSrv.create(tempVote).subscribe();
		return tempVote;
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
