import { Injectable } from '@angular/core';
import { ProductVote } from '~models';

import { GlobalService } from '~global-services/_global/global.service';
import { ProductVoteQueries } from '~global-services/product-vote/product-vote.queries';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class ProductVoteService extends GlobalService<ProductVote> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, ProductVoteQueries, 'productVote', 'productVotes');
	}

}

