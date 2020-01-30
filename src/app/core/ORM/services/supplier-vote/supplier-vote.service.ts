import { Injectable } from '@angular/core';
import { SupplierVote } from '~models';

import { GlobalService } from '~entity-services/_global/global.service';
import { SupplierVoteQueries } from '~entity-services/supplier-vote/supplier-vote.queries';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class SupplierVoteService extends GlobalService<SupplierVote> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, SupplierVoteQueries, 'supplierVote', 'supplierVotes');
	}

}
