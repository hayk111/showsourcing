import { Injectable } from '@angular/core';
import { ExternalRequest } from '~models';
import { Apollo } from 'apollo-angular';

import { GlobalService } from '~global-services/_global/global.service';
import { ExternalRequestQueries } from '~global-services/external-request/external-request.queries';
import { share, map, tap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { UserService } from '~global-services/user/user.service';


@Injectable({
	providedIn: 'root'
})
export class ExternalRequestService extends GlobalWithAuditService<ExternalRequest> {

	constructor(apollo: Apollo, protected userSrv: UserService) {
		super(apollo, new ExternalRequestQueries(), 'ExternalRequest', userSrv);
	}


}

