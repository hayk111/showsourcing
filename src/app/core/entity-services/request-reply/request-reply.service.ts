import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalService } from '~entity-services/_global/global.service';
import { RequestReply } from '~models';

import { RequestReplyQueries } from './request-reply.queries';


@Injectable({ providedIn: 'root' })
export class RequestReplyService extends GlobalService<RequestReply> {

	constructor(
		protected apolloState: ApolloStateService,
	) {
		super(apolloState, RequestReplyQueries, 'requestReply', 'requestReplies');
	}

}
