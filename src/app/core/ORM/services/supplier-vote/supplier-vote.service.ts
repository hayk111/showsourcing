import { Injectable } from '@angular/core';
import { SupplierVote } from '~core/ORM/models';

import { GlobalService } from '~core/ORM/services/_global/global.service';
import { SupplierVoteQueries } from '~core/ORM/services/supplier-vote/supplier-vote.queries';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class SupplierVoteService extends GlobalService<SupplierVote> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, SupplierVoteQueries, 'supplierVote', 'supplierVotes');
	}

}
