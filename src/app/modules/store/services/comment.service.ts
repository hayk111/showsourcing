import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityTarget } from '../../store/utils/entities.utils';
import { AppComment } from '../model/entities/comment.model';
import { uuid } from '../utils/uuid.utils';
import { selectUser } from '../selectors/entities/user.selector';
import { Store } from '@ngrx/store';
import { User } from '../model/entities/user.model';
import { tap } from 'rxjs/operators';

@Injectable()
export class CommentService {
	user;
	constructor(private http: HttpClient, private store: Store<any>) {
		this.store.select(selectUser)
			.subscribe((user: User) => this.user = user);
	}

	getPendingComment(comment: AppComment) {
		const id = uuid();
		const createdByUserId = this.user.id;
		const creationDate = Date.now();
		return { ...comment, id, createdByUserId, creationDate };
	}

	load(target: EntityTarget) {
		const name = target.entityRepr.urlName;
		const id = target.entityId;
		return this.http.get(`api/${name}/${id}/comment`).pipe(
			tap((comments: Array<AppComment>) => comments.forEach(c => c.target = target))
		);
	}

	postComment(comment: AppComment) {
		return this.http.post(`api/product/${comment.target.entityId}/comment`, { text: comment.text });
	}
}
