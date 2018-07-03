import { Injectable } from '@angular/core';
import { ProductVote } from '~models';
import { ApolloClient } from '~shared/apollo';

import { GlobalService } from '../_global/global.service';
import { ProductVoteQueries } from './product-vote.queries';


@Injectable({
	providedIn: 'root'
})
export class ProductVoteService extends GlobalService<ProductVote> {

	constructor(protected apollo: ApolloClient) {
		super(apollo, new ProductVoteQueries(), 'ProductVote');
	}

}

