import { Injectable } from '@angular/core';
import { ProductVoteService } from '~global-services/product-vote/product-vote.service';
import { Product, ProductVote } from '~models';
import { UserService } from '~global-services/user/user.service';

@Injectable({ providedIn: 'root' })
export class ThumbService {


	constructor(
		private voteSrv: ProductVoteService,
		private userSrv: UserService
	) {

	}

	thumbUp(product: Product) {
		const voteIndex = (product.votes || []).findIndex(v => v.user.id === this.userSrv.userSync.id);
		let votes;
		if (~voteIndex) {
			const vote = product.votes[voteIndex];
			if (vote.value === 100) {
				votes = this.deleteVote(product.votes, vote);
			} else {
				votes = this.updateVote(product.votes, voteIndex, 100);
			}
		} else {
			votes = this.createVote(product.votes || [], 100);
		}
		return votes;
	}

	thumbDown(product: Product) {
		const voteIndex = (product.votes || []).findIndex(v => v.user.id === this.userSrv.userSync.id);
		let votes;
		if (~voteIndex) {
			const vote = product.votes[voteIndex];
			if (vote.value === 0) {
				votes = this.deleteVote(product.votes, vote);
			} else {
				votes = this.updateVote(product.votes, voteIndex, 0);
			}
		} else {
			votes = this.createVote(product.votes || [], 0);
		}
		return votes;
	}

	private createVote(votes: ProductVote[], value: number) {
		const vote = new ProductVote({
			value,
			user: {
				id: this.userSrv.userSync.id,
				firstName: this.userSrv.userSync.firstName,
				lastName: this.userSrv.userSync.lastName,
				avatar: this.userSrv.userSync.avatar,
				__typename: 'User'
			}
		});
		votes.push(vote);
		return votes;
	}

	private updateVote(votes: ProductVote[], voteIndex: number, value: number) {
		votes[voteIndex] = { ...votes[voteIndex], value };
		return votes;
	}

	private deleteVote(votes: ProductVote[], vote: ProductVote) {
		this.voteSrv.delete(vote.id).subscribe();
		return votes.filter(v => v.id !== vote.id);
	}
}
