import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalService } from '~core/ORM/services/_global/global.service';
import { RequestReply } from '~core/ORM/models';

import { RequestReplyQueries } from './request-reply.queries';
import { Client } from '~core/apollo/services/apollo-client-names.const';


@Injectable({ providedIn: 'root' })
export class RequestReplyService extends GlobalService<RequestReply> {

	defaultClient = Client.GLOBAL_REQUEST;

	constructor(
		protected apolloState: ApolloStateService,
	) {
		super(apolloState, RequestReplyQueries, 'requestReply', 'requestReplies');
	}

}
