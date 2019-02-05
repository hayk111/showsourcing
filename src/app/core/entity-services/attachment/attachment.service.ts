import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { AttachmentQueries } from '~entity-services/attachment/attachment.queries';
import { Attachment } from '~models';

import { GlobalService } from '../_global/global.service';


@Injectable({
	providedIn: 'root'
})
export class AttachmentService extends GlobalService<Attachment> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, AttachmentQueries, 'attachment', 'attachments');
	}

	download(file: Attachment) {
		if (window) {
			window.open(file.url);
		}
	}
}
