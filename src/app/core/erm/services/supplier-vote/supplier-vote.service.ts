import { Injectable } from '@angular/core';
import { SupplierVote } from '~core/erm/models';

import { GlobalService } from '~core/erm/services/_global/global.service';
import { SupplierVoteQueries } from '~core/erm/services/supplier-vote/supplier-vote.queries';



@Injectable({
	providedIn: 'root'
})
export class SupplierVoteService extends GlobalService<SupplierVote> {

	constructor() {
		super(SupplierVoteQueries, 'supplierVote', 'supplierVotes');
	}

}
