import { Injectable } from '@angular/core';
import { ProductVote } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { GlobalService } from '../_global/global.service';
import { ProductVoteQueries } from './product-vote.queries';


@Injectable({
	providedIn: 'root'
})
export class ProductVoteService extends GlobalService<ProductVote> {

	constructor(protected apollo: ApolloWrapper) {
		super(apollo, new ProductVoteQueries(), 'ProductVote');
	}

}

