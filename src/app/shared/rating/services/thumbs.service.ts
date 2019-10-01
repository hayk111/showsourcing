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
	 * computes the current score of the votes given a product
	 * @param product product with votes to be computed
	 */
	computeScore(product: Product) {
		return this.computeScoreVotes(product.votes || []);
	}

	/**
	 * computes the current score of the votes given votes
	 * @param votes array of product votes to be computed
	 * @result score of the votes per 5
	 */
	computeScoreVotes(votes: ProductVote[]): number {
		let score = null;
		if (votes && votes.length) {
			votes.forEach(vote => score += vote.value);
			score /= votes.length;
			score = Math.round(score) / 20;
		}
		return score;
	}

	/**
	 * computes the current score of the votes given votes
	 * @deprecated
	 * @param votes array of product votes to be computed
	 * @result score of the votes per 100
	 */
	getAvgVotes(votes: ProductVote[]): number {
		if (!votes || !votes.length) {
			return -1;
		}

		const votesVals = votes.map(vote => vote.value);
		const sum = votesVals.reduce((votePrev, voteNext) => votePrev + voteNext, 0);
		return Math.round(sum / votes.length) / 100;
	}

	// Rating Star section

	/**
	 * updates a vote from the user and return the list of the votes given by a product
	 * this function is called only when we are updating a single product, with no multiple selection involved
	 * @param votes current votes
	 * @param value value received to update
	 */
	starVote(votes: ProductVote[], value: number) {
		const voteIndex = (votes || []).findIndex(vote => vote.user && vote.user.id === this.userSrv.userSync.id);
		let newVotes = [...votes || []];
		if (~voteIndex) {
			const vote = votes[voteIndex];
			if (vote.value === value) {
				newVotes = this.deleteVote(newVotes, vote);
			} else if (value % 20 === 0 && value <= 100 && value >= 0) {
				this.updateVote(newVotes, voteIndex, value);
			} else {
				throw Error(`Trying to update the vote with a non valid value: ${value}`);
			}
		} else {
			this.createVote(newVotes, value);
		}

		return newVotes;
	}

	// Rating Thumb section

	/**
	 * updates a vote from the user and return the list of the votes given by a product
	 * this function is called only when we are updating a single product, with no multiple selection involved
	 * @param product
	 */
	thumbUp(product: Product) {
		const voteIndex = (product.votes || []).findIndex(v => v.user && v.user.id === this.userSrv.userSync.id);
		// this way we dont keep the same reference
		let newVotes = product.votes ? [...product.votes] : [];
		if (~voteIndex) { // if the user has a vote inside this product
			const vote = newVotes[voteIndex];
			if (vote.value === 100) // if the vote was already a thumb up, we delete
				newVotes = this.deleteVote(newVotes, vote);
			else // else we update it
				this.updateVote(newVotes, voteIndex, 100);
		} else // if the user has no vote we create a new one
			this.createVote(newVotes, 100);

		return newVotes;
	}

	/**
	 * updates a vote from the user and return the list of the votes given by a product
	 * this function is called only when we are updating a single product, with no multiple selection involved
	 * @param product
	 */
	thumbDown(product: Product) {
		const voteIndex = (product.votes || []).findIndex(v => v.user && v.user.id === this.userSrv.userSync.id);
		let newVotes = product.votes ? [...product.votes] : [];
		if (~voteIndex) {
			const vote = newVotes[voteIndex];
			if (vote.value === 0)
				newVotes = this.deleteVote(newVotes, vote);
			else
				this.updateVote(newVotes, voteIndex, 0);
		} else
			this.createVote(newVotes, 0);

		return newVotes;
	}

	/**
	 * updates a vote from the user and return the list of the votes given by a product
	 * this function is called only when we are updating a single product, and multiselection is involved
	 * @param product
	 * @param isCreated if true the vote is created, if false, removed
	 */
	thumbUpFromMulti(product: Product, isCreated: boolean) {
		const voteIndex = (product.votes || []).findIndex(v => v.user && v.user.id === this.userSrv.userSync.id);
		let newVotes = product.votes ? [...product.votes] : [];
		if (~voteIndex) { // if the user has a vote inside this product
			const vote = newVotes[voteIndex];
			if (vote.value === 0 && isCreated) // we only update a vote when it is highlighted and the previous value was thumbdown
				this.updateVote(newVotes, voteIndex, 100);
			else if (!isCreated) // if the highlight is off that means we have to delete the vote no matter if its up or down
				newVotes = this.deleteVote(newVotes, vote);
		} else if (isCreated) // if the user does not have a vote and the highlight is on
			this.createVote(newVotes, 100);

		return newVotes;
	}

	/**
	 * updates a vote from the user and return the list of the votes given by a product
	 * this function is called only when we are updating a single product, and multiselection is involved
	 * @param product
	 * @param isCreated if true the vote is created, if false, removed
	 */
	thumbDownFromMulti(product: Product, isCreated: boolean) {
		const voteIndex = (product.votes || []).findIndex(v => v.user && v.user.id === this.userSrv.userSync.id);
		let newVotes = product.votes ? [...product.votes] : [];
		if (~voteIndex) {
			const vote = newVotes[voteIndex];
			if (vote.value === 100 && isCreated)
				this.updateVote(newVotes, voteIndex, 0);
			else if (!isCreated)
				newVotes = this.deleteVote(newVotes, vote);
		} else if (isCreated)
			this.createVote(newVotes, 0);

		return newVotes;
	}


	// Component functions
	private updateVote(votes: ProductVote[], voteIndex: number, value: number) {
		votes[voteIndex] = { ...votes[voteIndex], value };
	}

	private deleteVote(votes: ProductVote[], vote: ProductVote) {
		// we decide to delete it here, since we have issue when updating empty arrays (check README)
		this.voteSrv.delete(vote.id).subscribe();
		return votes.filter(v => v.id !== vote.id);
	}

	private createVote(votes: ProductVote[], value: number) {
		const vote = new ProductVote({
			value,
			user: {
				id: this.userSrv.userSync.id,
				firstName: this.userSrv.userSync.firstName,
				lastName: this.userSrv.userSync.lastName,
				// avatar: this.userSrv.userSync.avatar,
				__typename: 'User'
			}
		});
		votes.push(vote);
	}

}
