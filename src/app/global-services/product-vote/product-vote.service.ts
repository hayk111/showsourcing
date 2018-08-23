import { Injectable } from '@angular/core';
import { ProductVote } from '~models';
import { Apollo } from 'apollo-angular';

import { GlobalService } from '~global-services/_global/global.service';
import { ProductVoteQueries } from '~global-services/product-vote/product-vote.queries';


@Injectable({
	providedIn: 'root'
})
export class ProductVoteService extends GlobalService<ProductVote> {

	constructor(protected apollo: Apollo) {
		super(apollo, ProductVoteQueries, 'productVote', 'productVotes');
	}

}

