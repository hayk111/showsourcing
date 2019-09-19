import { GlobalService } from '../_global/global.service';
import { RPCRequest, IRPCRequest, RPCRequestStatus } from '~core/models';
import { ApolloStateService } from '~core/apollo';
import { Injectable } from '@angular/core';
import { RequestQueries } from './request.queries';
import { uuid } from '~utils';
import { switchMap, filter } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})


export class RpcService extends GlobalService<RPCRequest> {
	constructor(protected apolloState: ApolloStateService) {

		super(apolloState, RequestQueries, 'request', 'requests');
	}

	createRPC(rpcRequest: IRPCRequest) {
		const request = new RPCRequest(rpcRequest);
		return this.create(request).pipe(
			switchMap( req => this.waitForOne(`id == "${req.id}" AND status == "ready"`))
		).subscribe( a => alert(a) );
	}
}
