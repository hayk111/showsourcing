import { Injectable } from '@angular/core';
import { GlobalServiceInterface, GlobalService } from '~entity-services/_global/global.service';
import { Observable } from 'rxjs';
import { CommentQueries } from '~entity-services/comment/comment.queries';
import { Comment } from '~models';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { UserService } from '~entity-services/user/user.service';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({ providedIn: 'root' })
export class CommentService extends GlobalWithAuditService<Comment> {

	constructor(
		protected apolloState: ApolloStateService,
		protected userSrv: UserService
	) {
		super(apolloState, CommentQueries, 'comment', 'comments', userSrv);
	}

}
