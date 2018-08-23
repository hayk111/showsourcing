import { Injectable } from '@angular/core';
import { GlobalServiceInterface, GlobalService } from '~global-services/_global/global.service';
import { Observable } from 'rxjs';
import { CommentQueries } from '~global-services/comment/comment.queries';
import { Apollo } from 'apollo-angular';
import { AppComment } from '~models';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { UserService } from '~global-services/user/user.service';


@Injectable({ providedIn: 'root' })
export class CommentService extends GlobalWithAuditService<AppComment> {

	constructor(apollo: Apollo, protected userSrv: UserService) {
		super(apollo, CommentQueries, 'comment', 'comments', userSrv);
	}

}
