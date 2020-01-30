import { Injectable } from '@angular/core';
import { ProductVote } from '~core/erm/models';
import { ProductVoteQueries } from '~core/erm/services/product-vote/product-vote.queries';
import { GlobalService } from '~core/erm/services/_global/global.service';



@Injectable({
	providedIn: 'root'
})
export class ProductVoteService extends GlobalService<ProductVote> {

	constructor() {
		super(ProductVoteQueries, 'productVote', 'productVotes');
	}

}

