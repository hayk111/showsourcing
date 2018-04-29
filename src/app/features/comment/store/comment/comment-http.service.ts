import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityTarget } from '~entity/store/entity.model';
import { AppComment } from '~comment/store/comment/comment.model';
import { selectUser } from '~user';
import { Store } from '@ngrx/store';
import { User } from '~user';

@Injectable()
export class CommentHttpService {
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

	create(comment: AppComment, target: EntityTarget) {
		return this.http.post(`api/${target.entityRepr.urlName}/${target.entityId}/comment`, { text: comment.text });
	}
}
