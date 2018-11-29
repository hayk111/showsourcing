import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Tag } from '~models';
import { Apollo } from 'apollo-angular';
import { GlobalServiceInterface, GlobalService } from '~global-services/_global/global.service';

import { TagQueries } from '~global-services/tag/tag.queries';
import { UserService } from '~global-services/user/user.service';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class TagService extends GlobalWithAuditService<Tag> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, TagQueries, 'tag', 'tags', userSrv);
	}

}
