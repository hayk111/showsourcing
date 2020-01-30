import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { AttachmentQueries } from '~core/ORM/services/attachment/attachment.queries';
import { Attachment } from '~core/ORM/models';
import { GlobalWithAuditService } from '../_global/global-with-audit.service';
import { UserService } from '../user/user.service';



@Injectable({
	providedIn: 'root'
})
export class AttachmentService extends GlobalWithAuditService<Attachment> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, AttachmentQueries, 'attachment', 'attachments', userSrv);
	}

	download(file: Attachment) {
		if (window) {
			window.open(file.url);
		}
	}
}
