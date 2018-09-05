import { Injectable } from '@angular/core';
import { GlobalServiceInterface, GlobalService } from '~global-services/_global/global.service';
import { Observable } from 'rxjs';
import { CommentQueries } from '~global-services/comment/comment.queries';
import { Apollo } from 'apollo-angular';
import { Comment } from '~models';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { UserService } from '~global-services/user/user.service';
import { ApolloStateService } from '~shared/apollo';


@Injectable({ providedIn: 'root' })
export class CommentService extends GlobalWithAuditService<Comment> {

	constructor(protected apollo: Apollo, protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apollo, apolloState, CommentQueries, 'comment', 'comments', userSrv);
	}

}
