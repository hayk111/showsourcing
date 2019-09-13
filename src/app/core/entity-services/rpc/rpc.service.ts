import { GlobalService } from '../_global/global.service';
import { RPCRequest, IRPCRequest } from '~core/models';
import { ApolloStateService } from '~core/apollo';
import { TeamQueries } from '../team/team.queries';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})


export class RpcService extends GlobalService<RPCRequest> {
	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, TeamQueries, 'team', 'teams');
	}

	createRPC(request: IRPCRequest) {
		const rpc = new RPCRequest(request).reply;
		// this.create(rpc).subscribe((a) => console.log(a));
		// wait until status changes
		// then return new IRPCRequest with reply = response.reply
	}
}
