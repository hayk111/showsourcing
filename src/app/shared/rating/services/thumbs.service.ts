import { Injectable } from '@angular/core';
import { ProductVoteService } from '~entity-services/product-vote/product-vote.service';
import { UserService } from '~entity-services/user/user.service';
import { Product, ProductVote } from '~models';

@Injectable({ providedIn: 'root' })
export class ThumbService {

	constructor(
		private voteSrv: ProductVoteService,
		private userSrv: UserService
	) { }

	/**
	 * updates a vote from the user and return the list of the votes given by a product
	 * this function is called only when we are updating a single product, with no multiple selection involved
	 * @param product
	 */
	thumbUp(product: Product) {
		const voteIndex = (product.votes || []).findIndex(v => v.user.id === this.userSrv.userSync.id);
		// this way we dont keep the same reference
		let votes = product.votes ? [...product.votes] : [];
		if (~voteIndex) { // if the user has a vote inside this product
			const vote = votes[voteIndex];
			if (vote.value === 100) // if the vote was already a thumb up, we delete
				votes = this.deleteVote(votes, vote);
			else // else we update it
				this.updateVote(votes, voteIndex, 100);
		} else // if the user has no vote we create a new one
			this.createVote(votes, 100);

		return votes;
	}

	/**
	 * updates a vote from the user and return the list of the votes given by a product
	 * this function is called only when we are updating a single product, with no multiple selection involved
	 * @param product
	 */
	thumbDown(product: Product, multiple = false) {
		const voteIndex = (product.votes || []).findIndex(v => v.user.id === this.userSrv.userSync.id);
		let votes = product.votes ? [...product.votes] : [];
		if (~voteIndex) {
			const vote = votes[voteIndex];
			if (vote.value === 0)
				votes = this.deleteVote(votes, vote);
			else
				this.updateVote(votes, voteIndex, 0);
		} else
			this.createVote(votes, 0);

		return votes;
	}

	/**
	 * updates a vote from the user and return the list of the votes given by a product
	 * this function is called only when we are updating a single product, and multiselection is involved
	 * @param product
	 * @param isCreated if true the vote is created, if false, removed
	 */
	thumbUpFromMulti(product: Product, isCreated: boolean) {
		const voteIndex = (product.votes || []).findIndex(v => v.user.id === this.userSrv.userSync.id);
		let votes = product.votes ? [...product.votes] : [];
		if (~voteIndex) { // if the user has a vote inside this product
			const vote = votes[voteIndex];
			if (vote.value === 0 && isCreated) // we only update a vote when it is highlighted and the previous value was thumbdown
				this.updateVote(votes, voteIndex, 100);
			else if (!isCreated) // if the highlight is off that means we have to delete the vote no matter if its up or down
				votes = this.deleteVote(votes, vote);
		} else if (isCreated) // if the user does not have a vote and the highlight is on
			this.createVote(votes, 100);

		return votes;
	}

	/**
	 * updates a vote from the user and return the list of the votes given by a product
	 * this function is called only when we are updating a single product, and multiselection is involved
	 * @param product
	 * @param isCreated if true the vote is created, if false, removed
	 */
	thumbDownFromMulti(product: Product, isCreated: boolean) {
		const voteIndex = (product.votes || []).findIndex(v => v.user.id === this.userSrv.userSync.id);
		let votes = product.votes ? [...product.votes] : [];
		if (~voteIndex) {
			const vote = votes[voteIndex];
			if (vote.value === 100 && isCreated)
				this.updateVote(votes, voteIndex, 0);
			else if (!isCreated)
				votes = this.deleteVote(votes, vote);
		} else if (isCreated)
			this.createVote(votes, 0);

		return votes;
	}

	computeScore(product: Product) {
		let score = null;
		if (product && product.votes && product.votes.length) {
			product.votes.forEach(vote => score += vote.value);
			score /= product.votes.length;
		}
		return score;
	}

	private createVote(votes: ProductVote[], value: number) {
		const vote = new ProductVote({
			value,
			user: {
				id: this.userSrv.userSync.id,
				firstName: this.userSrv.userSync.firstName,
				lastName: this.userSrv.userSync.lastName,
				avatar: this.userSrv.userSync.avatar, // uncomment when the Image.creationDate bug is fixed
				__typename: 'User'
			}
		});
		votes.push(vote);
	}

	private updateVote(votes: ProductVote[], voteIndex: number, value: number) {
		votes[voteIndex] = { ...votes[voteIndex], value };
	}

	private deleteVote(votes: ProductVote[], vote: ProductVote) {
		this.voteSrv.delete(vote.id).subscribe();
		return votes.filter(v => v.id !== vote.id);
	}
}
