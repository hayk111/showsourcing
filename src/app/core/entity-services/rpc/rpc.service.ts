import { GlobalService } from '../_global/global.service';
import { RPCRequest, IRPCRequest } from '~core/models/rpc-request.model';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { Injectable } from '@angular/core';
import { RpcQueries } from './rpc.queries';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})


/**
 * Service for RPC requests
 */

export class RpcService extends GlobalService<RPCRequest> {
	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, RpcQueries, 'request', 'requests');
	}
	/**
	 * creates request with default status "pending" and subscribes for status changes
	 * when the status changes to "ready" you can get expected data from request.reply property
	 * @param rpcRequest request metadata
	 */
	createRPC(rpcRequest: IRPCRequest): Observable<RPCRequest> {
		const request = new RPCRequest(rpcRequest);
		return this.create(request).pipe(
			switchMap( req => this.waitForOne(`id == "${req.id}" AND (status == "ready" OR status == "error")`))
		);
	}
}
