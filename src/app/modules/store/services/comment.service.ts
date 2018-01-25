import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityTarget } from '../../store/utils/entities.utils';
import { AppComment } from '../model/comment.model';
import { uuid } from '../utils/uuid.utils';
import { selectUser } from '../selectors/user.selector';
import { Store } from '@ngrx/store';
import { User } from '../model/user.model';
import { tap } from 'rxjs/operators';

@Injectable()
export class CommentService {
	user;
	constructor(private http: HttpClient, private store: Store<any>) {
		this.store.select(selectUser)
			.subscribe((user: User) => this.user = user);
	}

	load(target: EntityTarget) {
		const name = target.entityRepr.urlName;
		const id = target.entityId;
		return this.http.get(`api/${name}/${id}/comment`);
	}

	postComment(comment: AppComment, target: EntityTarget) {
		return this.http.post(`api/${target.entityRepr.urlName}/${target.entityId}/comment`, { text: comment.text });
	}
}
