import { Injectable } from '@angular/core';

import { GlobalService } from '~core/erm/services/_global/global.service';
import { RequestReply } from '~core/erm/models';

import { RequestReplyQueries } from './request-reply.queries';



@Injectable({ providedIn: 'root' })
export class RequestReplyService extends GlobalService<RequestReply> {

	constructor() {
		super(RequestReplyQueries, 'requestReply', 'requestReplies');
	}

}
