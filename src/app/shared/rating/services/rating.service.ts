import { Injectable } from '@angular/core';
import { SupplierVoteService } from '~core/ORM/services';
import { ProductVoteService } from '~entity-services/product-vote/product-vote.service';
import { UserService } from '~entity-services/user/user.service';
import { EntityName, Product, ProductVote, Supplier, SupplierVote } from '~models';

export type Vote = ProductVote | SupplierVote;
export type EntityWithVotes = Product | Supplier;
export type TypeWithVotes = EntityName.PRODUCT | EntityName.SUPPLIER;

@Injectable({ providedIn: 'root' })
export class RatingService {

	constructor(
		private productVoteSrv: ProductVoteService,
		private supplierVoteSrv: SupplierVoteService,
		private userSrv: UserService
	) { }

	/**
	 * computes the current score of the votes given a entity
	 * @param entity entity with votes to be computed
	 */
	computeScore(entity: EntityWithVotes) {
		return this.computeScoreVotes(entity.votes || []);
	}

	/**
	 * computes the current score of the votes given votes
	 * @param votes array of entity votes to be computed
	 * @result score of the votes per 5
	 */
	computeScoreVotes(votes: Vote[]): number {
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
	 * @param votes array of entity votes to be computed
	 * @result score of the votes per 100
	 */
	getAvgVotes(votes: Vote[]): number {
		if (!votes || !votes.length) {
			return -1;
		}

		const votesVals = votes.map(vote => vote.value);
		const sum = votesVals.reduce((votePrev, voteNext) => votePrev + voteNext, 0);
		return Math.round(sum / votes.length) / 100;
	}

	// Rating Star section

	/**
	 * updates a vote from the user and return the list of the votes given by a entity
	 * this function is called only when we are updating a single entity, with no multiple selection involved
	 * @param votes current votes
	 * @param value value received to update
	 * @param type type of entity
	 */
	starVote(votes: Vote[], value: number, type: TypeWithVotes) {
		const voteIndex = (votes || []).findIndex(vote => vote.user && vote.user.id === this.userSrv.userSync.id);
		let newVotes = [...votes || []];
		if (~voteIndex) {
			const vote = votes[voteIndex];
			if (vote.value === value) {
				newVotes = this.deleteVote(newVotes, vote, type);
			} else if (value % 20 === 0 && value <= 100 && value >= 0) {
				this.updateVote(newVotes, voteIndex, value);
			} else {
				throw Error(`Trying to update the vote with a non valid value: ${value}`);
			}
		} else {
			this.createVote(newVotes, value, type);
		}

		return newVotes;
	}

	// Rating Thumb section

	/**
	 * updates a vote from the user and return the list of the votes given by a entity
	 * this function is called only when we are updating a single entity, with no multiple selection involved
	 * @param entity entity we want to update
	 * @param type type of the entity
	 */
	thumbUp(entity: EntityWithVotes, type: TypeWithVotes) {
		const voteIndex = (entity.votes || []).findIndex(v => v.user && v.user.id === this.userSrv.userSync.id);
		// this way we dont keep the same reference
		let newVotes = entity.votes ? [...entity.votes] : [];
		if (~voteIndex) { // if the user has a vote inside this product
			const vote = newVotes[voteIndex];
			if (vote.value === 100) // if the vote was already a thumb up, we delete
				newVotes = this.deleteVote(newVotes, vote, type);
			else // else we update it
				this.updateVote(newVotes, voteIndex, 100);
		} else // if the user has no vote we create a new one
			this.createVote(newVotes, 100, type);

		return newVotes;
	}

	/**
	 * updates a vote from the user and return the list of the votes given by a entity
	 * this function is called only when we are updating a single entity, with no multiple selection involved
	 * @param entity
	 * @param type
	 */
	thumbDown(entity: EntityWithVotes, type: TypeWithVotes) {
		const voteIndex = (entity.votes || []).findIndex(v => v.user && v.user.id === this.userSrv.userSync.id);
		let newVotes = entity.votes ? [...entity.votes] : [];
		if (~voteIndex) {
			const vote = newVotes[voteIndex];
			if (vote.value === 0)
				newVotes = this.deleteVote(newVotes, vote, type);
			else
				this.updateVote(newVotes, voteIndex, 0);
		} else
			this.createVote(newVotes, 0, type);

		return newVotes;
	}

	/**
	 * updates a vote from the user and return the list of the votes given by a entity
	 * this function is called only when we are updating a single entity, and multiselection is involved
	 * @param entity
	 * @param isCreated if true the vote is created, if false, removed
	 * @param type type of entity
	 */
	thumbUpFromMulti(entity: EntityWithVotes, isCreated: boolean, type: TypeWithVotes) {
		const voteIndex = (entity.votes || []).findIndex(v => v.user && v.user.id === this.userSrv.userSync.id);
		let newVotes = entity.votes ? [...entity.votes] : [];
		if (~voteIndex) { // if the user has a vote inside this entity
			const vote = newVotes[voteIndex];
			if (vote.value === 0 && isCreated) // we only update a vote when it is highlighted and the previous value was thumbdown
				this.updateVote(newVotes, voteIndex, 100);
			else if (!isCreated) // if the highlight is off that means we have to delete the vote no matter if its up or down
				newVotes = this.deleteVote(newVotes, vote, type);
		} else if (isCreated) // if the user does not have a vote and the highlight is on
			this.createVote(newVotes, 100, type);

		return newVotes;
	}

	/**
	 * updates a vote from the user and return the list of the votes given by a entity
	 * this function is called only when we are updating a single entity, and multiselection is involved
	 * @param entity
	 * @param isCreated if true the vote is created, if false, removed
	 * @param type type of entity
	 */
	thumbDownFromMulti(entity: EntityWithVotes, isCreated: boolean, type: TypeWithVotes) {
		const voteIndex = (entity.votes || []).findIndex(v => v.user && v.user.id === this.userSrv.userSync.id);
		let newVotes = entity.votes ? [...entity.votes] : [];
		if (~voteIndex) {
			const vote = newVotes[voteIndex];
			if (vote.value === 100 && isCreated)
				this.updateVote(newVotes, voteIndex, 0);
			else if (!isCreated)
				newVotes = this.deleteVote(newVotes, vote, type);
		} else if (isCreated)
			this.createVote(newVotes, 0, type);

		return newVotes;
	}


	// Component functions
	private updateVote(votes: Vote[], voteIndex: number, value: number) {
		votes[voteIndex] = { ...votes[voteIndex], value };
	}

	private deleteVote(votes: Vote[], vote: Vote, type: TypeWithVotes) {
		let voteSrv = null;
		switch (type) {
			case EntityName.PRODUCT:
				voteSrv = this.productVoteSrv;
				break;
			case EntityName.SUPPLIER:
				voteSrv = this.supplierVoteSrv;
				break;
			default:
				throw Error(`Incorrect/No type to delete vote type=${type}`);
		}
		// we decide to delete it here, since we have issue when updating empty arrays (check README)
		voteSrv.delete(vote.id).subscribe();
		return votes.filter(v => v.id !== vote.id);
	}

	private createVote(votes: Vote[], value: number, type: TypeWithVotes) {
		const voteInfo = {
			value,
			user: {
				id: this.userSrv.userSync.id,
				firstName: this.userSrv.userSync.firstName,
				lastName: this.userSrv.userSync.lastName,
				// avatar: this.userSrv.userSync.avatar,
				__typename: 'User'
			},
			creationDate: new Date().toString()
		};

		let vote;
		switch (type) {
			case EntityName.PRODUCT:
				vote = new ProductVote(voteInfo);
				break;
			case EntityName.SUPPLIER:
				vote = new SupplierVote(voteInfo);
				break;
			default:
				throw Error(`Incorrect/No type to create vote type=${type}`);
		}
		votes.push(vote);
	}

}
