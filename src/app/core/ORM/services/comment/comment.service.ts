import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalWithAuditService } from '~core/orm/services/_global/global-with-audit.service';
import { CommentQueries } from '~core/orm/services/comment/comment.queries';
import { UserService } from '~core/orm/services/user/user.service';
import { Comment } from '~core/orm/models';


@Injectable({ providedIn: 'root' })
export class CommentService extends GlobalWithAuditService<Comment> {

	constructor(
		protected apolloState: ApolloStateService,
		protected userSrv: UserService
	) {
		super(apolloState, CommentQueries, 'comment', 'comments', userSrv);
	}

}
