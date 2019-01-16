import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { AttachmentQueries } from '~entity-services/attachment/attachment.queries';
import { UserService } from '~entity-services/user/user.service';
import { Attachment } from '~models';


@Injectable({
	providedIn: 'root'
})
export class AttachmentService extends GlobalWithAuditService<Attachment> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, AttachmentQueries, 'attachment', 'attachments', userSrv);
	}

}
