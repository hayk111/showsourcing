import { Injectable } from '@angular/core';
import { UserService } from '~core/auth';
import { BehaviorSubject } from 'rxjs';
import { Vote, Product, Supplier } from '~core/erm3/models';
import { ApiService } from '~core/erm3/services/api.service';
import { Entity } from '~core/erm3/models/_entity.model';

type TypeWithVotes = Product | Supplier;

@Injectable({ providedIn: 'root' })
export class RatingService {
	ratings: Vote[] = [];

	private _valueChanges$ = new BehaviorSubject<Vote[]>(this.ratings);
	valueChanges$ = this._valueChanges$.asObservable();

	constructor(
		private userSrv: UserService,
		private apiSrv: ApiService,
	) {}

	setup(ratings) {
		this.ratings = ratings;
	}

	/**
	 * computes the current score of the votes given a entity
	 * @param entity entity with votes to be computed
	 */
	computeScore(entity: any) {
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
			votes.forEach(vote => score += vote.rating);
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
	getAvgVotes(votes: any[]): number {
		if (!votes || !votes.length) {
			return -1;
		}

		const votesVals = votes.map(vote => vote.rating);
		const sum = votesVals.reduce((votePrev, voteNext) => votePrev + voteNext, 0);
		return Math.round(sum / votes.length) / 100;
	}

	// Rating Star section

	/**
	 * updates a vote from the user and return the list of the votes given by a entity
	 * this function is called only when we are updating a single entity, with no multiple selection involved
	 * @param rating current vote
	 * @param newValue value received to update
	 * @param type type of entity
	 */
	starVote(votes: Vote[], value: number, nodeId: string, acceptDelete = true) {
		const voteIndex = (votes || []).findIndex(vote => {
			if ((vote.createdBy && vote.createdBy.id === this.userSrv.userId) ||
					(vote.voteCreatedById && vote.voteCreatedById === this.userSrv.userId)) {
				return true;
			}
		});
		const newVotes = [...votes || []];
		if (voteIndex !== -1) {
			const vote = votes[voteIndex];
			if (vote.rating === value) {
				if (acceptDelete) this.deleteVote(newVotes, vote, voteIndex);
			} else if (value % 20 === 0 && value <= 100 && value >= 0) {
				vote.rating = value;
				this.updateVote(newVotes, vote, voteIndex);
			} else {
				throw Error(`Trying to update the vote with a non valid value: ${value}`);
			}
		} else {
			this.createVote(newVotes, value, nodeId);
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
	thumbUp(entity: any, type: TypeWithVotes) {
		// const voteIndex = (entity.votes || []).findIndex(v => v.user && v.user.id === this.userSrv.userId);
		// // this way we dont keep the same reference
		// let newVotes = entity.votes ? [...entity.votes] : [];
		// if (~voteIndex) { // if the user has a vote inside this product
		// 	const vote = newVotes[voteIndex];
		// 	if (vote.rating === 100) // if the vote was already a thumb up, we delete
		// 		newVotes = this.deleteVote(newVotes, vote, type);
		// 	else // else we update it
		// 		this.updateVote(newVotes, voteIndex, 100);
		// } else // if the user has no vote we create a new one
		// 	this.createVote(newVotes, 100, type);

		// return newVotes;
	}

	/**
	 * updates a vote from the user and return the list of the votes given by a entity
	 * this function is called only when we are updating a single entity, with no multiple selection involved
	 * @param entity
	 * @param type
	 */
	thumbDown(entity: any, type: TypeWithVotes) {
		// const voteIndex = (entity.votes || []).findIndex(v => v.user && v.user.id === this.userSrv.userId);
		// let newVotes = entity.votes ? [...entity.votes] : [];
		// if (~voteIndex) {
		// 	const vote = newVotes[voteIndex];
		// 	if (vote.rating === 0)
		// 		newVotes = this.deleteVote(newVotes, vote, type);
		// 	else
		// 		this.updateVote(newVotes, voteIndex, 0);
		// } else
		// 	this.createVote(newVotes, 0, type);

		// return newVotes;
	}

	/**
	 * updates a vote from the user and return the list of the votes given by a entity
	 * this function is called only when we are updating a single entity, and multiselection is involved
	 * @param entity
	 * @param isCreated if true the vote is created, if false, removed
	 * @param type type of entity
	 */
	thumbUpFromMulti(entity: any, isCreated: boolean, type: TypeWithVotes) {
		// const voteIndex = (entity.votes || []).findIndex(v => v.user && v.user.id === this.userSrv.userId);
		// let newVotes = entity.votes ? [...entity.votes] : [];
		// if (~voteIndex) { // if the user has a vote inside this entity
		// 	const vote = newVotes[voteIndex];
		// 	if (vote.rating === 0 && isCreated) // we only update a vote when it is highlighted and the previous value was thumbdown
		// 		this.updateVote(newVotes, voteIndex, 100);
		// 	else if (!isCreated) // if the highlight is off that means we have to delete the vote no matter if its up or down
		// 		newVotes = this.deleteVote(newVotes, vote, type);
		// } else if (isCreated) // if the user does not have a vote and the highlight is on
		// 	this.createVote(newVotes, 100, type);

		// return newVotes;
	}

	/**
	 * updates a vote from the user and return the list of the votes given by a entity
	 * this function is called only when we are updating a single entity, and multiselection is involved
	 * @param entity
	 * @param isCreated if true the vote is created, if false, removed
	 * @param type type of entity
	 */
	thumbDownFromMulti(entity: any, isCreated: boolean, type: TypeWithVotes) {
		// const voteIndex = (entity.votes || []).findIndex(v => v.user && v.user.id === this.userSrv.userId);
		// let newVotes = entity.votes ? [...entity.votes] : [];
		// if (~voteIndex) {
		// 	const vote = newVotes[voteIndex];
		// 	if (vote.rating === 100 && isCreated)
		// 		this.updateVote(newVotes, voteIndex, 0);
		// 	else if (!isCreated)
		// 		newVotes = this.deleteVote(newVotes, vote, type);
		// } else if (isCreated)
		// 	this.createVote(newVotes, 0, type);

		// return newVotes;
	}


	// Component functions
	private updateVote(votes: Vote[], vote: Vote, voteIndex: number) {
		const { id, rating } = vote;
		votes[voteIndex] = { ...votes[voteIndex], rating };

		const ratingInfo = {
			id,
			rating,
		};

 		return this.apiSrv.update('Vote', {
			...ratingInfo
		} as Entity);
	}

	private deleteVote(votes: Vote[], vote: Vote, voteIndex: number) {
		const { id, rating } = vote;
		const index = votes.findIndex(v => v.id === id);
		votes.splice(index, 1);

		const ratingInfo = {
			id,
			rating,
		};

		return this.apiSrv.delete('Vote', {
			...ratingInfo
		} as Entity);
	}

	private createVote(votes: Vote[], rating: number, nodeId: string) {
		const voteInfo = {
			rating,
			nodeId,
			voteCreatedById: this.userSrv.userId
		};

		votes.push(voteInfo);

		this.apiSrv.create('Vote', {
			...voteInfo
		} as Entity);
	}

	applyRatings(items: any[], ratings: Vote[]) {
		const itemsWithRatings = [...items];

		items.forEach(item => {
			item.votes = [...this.findAllOccurencies(ratings, item.id)];
		});

		return itemsWithRatings;
	}

	private findAllOccurencies(arr: Vote[], id: string) {
		const votes = [];
		let i = -1;

		const nodeIds = arr.map(vote => vote.nodeId.split(':')[1]);

		while ((i = nodeIds.indexOf(id, i + 1)) !== -1) {
			votes.push(arr[i]);
		}

		return votes;
	}

	onThumbUp(item: Entity) {
		// const votes = this.ratingSrv.thumbUp(item, type);
		// return this.dataSrv.update({ id: item.id, votes } as any).subscribe();
	}

	onThumbDown(item: Entity) {
		// const votes = this.ratingSrv.thumbDown(item, type);
		// return this.dataSrv.update({ id: item.id, votes } as any).subscribe();
	}

}
