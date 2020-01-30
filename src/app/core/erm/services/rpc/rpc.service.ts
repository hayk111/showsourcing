import { GlobalService } from '../_global/global.service';
import { RPCRequest, IRPCRequest } from '~core/erm/models/rpc-request.model';

import { Injectable } from '@angular/core';
import { RpcQueries } from './rpc.queries';
import { switchMap, timeout } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})


/**
 * Service for RPC requests
 */

export class RpcService extends GlobalService<RPCRequest> {
	constructor() {
		super(RpcQueries, 'request', 'requests');
	}
	/**
	 * creates request with default status "pending" and subscribes for status changes
	 * when the status changes to "ready" you can get expected data from request.reply property
	 * @param rpcRequest request metadata
	 */
	createRPC(rpcRequest: IRPCRequest): Observable<RPCRequest> {
		const request = new RPCRequest(rpcRequest);
		return this.create(request).pipe(
			switchMap( req => this.waitForOne(`id == "${req.id}" AND (status == "ready" OR status == "error")`)),
			timeout(5000)
		);
	}
}
