import { Injectable } from '@angular/core';
import { ProductVote } from '~core/ORM/models';

import { GlobalService } from '~core/ORM/services/_global/global.service';
import { ProductVoteQueries } from '~core/ORM/services/product-vote/product-vote.queries';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class ProductVoteService extends GlobalService<ProductVote> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, ProductVoteQueries, 'productVote', 'productVotes');
	}

}

