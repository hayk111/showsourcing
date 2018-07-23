import { Injectable } from '@angular/core';
import { ProductVoteRequest } from '~models';
import { ApolloWrapper } from '~shared/apollo';

import { GlobalService } from '~global-services/_global/global.service';
import { ProductVoteRequestQueries } from '~global-services/product-vote-request/product-vote-request.queries';


@Injectable({
	providedIn: 'root'
})
export class ProductVoteRequestService extends GlobalService<ProductVoteRequest> {

	constructor(protected apollo: ApolloWrapper) {
		super(apollo, new ProductVoteRequestQueries(), 'ProductVoteRequest');
	}

}

