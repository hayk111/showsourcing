import { Injectable } from '@angular/core';
import { Tag } from '~core/erm/models';
import { TagQueries } from '~core/erm/services/tag/tag.queries';
import { UserService } from '~core/erm/services/user/user.service';
import { GlobalWithAuditService } from '~core/erm/services/_global/global-with-audit.service';




@Injectable({
	providedIn: 'root'
})
export class TagService extends GlobalWithAuditService<Tag> {

	constructor( protected userSrv: UserService) {
		super(TagQueries, 'tag', 'tags', userSrv);
	}

}
