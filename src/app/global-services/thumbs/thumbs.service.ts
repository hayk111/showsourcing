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
		if (~voteIndex) {
			const vote = product.votes[voteIndex];
			if (vote.value === 100) {
				this.deleteVote(vote);
			} else {
				this.updateVote(0);
			}
		} else {
			// create vote
		}
	}

	thumbDown(product: Product) {
		const voteIndex = (product.votes || []).findIndex(v => v.user.id === this.userSrv.userSync.id);
		if (~voteIndex) {
			const vote = product.votes[voteIndex];
			if (vote.value === 0) {
				this.deleteVote(vote);
			} else {
				this.updateVote(100);
			}
		} else {
			// create vote
		}
	}

	private updateVote(value: number) {

	}

	private deleteVote(vote: ProductVote) {

	}

	private createVote() {

	}
}
