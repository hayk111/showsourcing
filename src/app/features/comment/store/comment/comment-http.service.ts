import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityTarget } from '~app/entity/store/entity.model';
import { AppComment } from '~feature/comment/store/comment';
import { Store } from '@ngrx/store';
import { User } from '~models';

@Injectable()
export class CommentHttpService {
	constructor(private http: HttpClient, private store: Store<any>) {

	}

	load(target: EntityTarget) {
		const name = target.entityRepr.urlName;
		const id = target.entityId;
		return this.http.get(`api/${name}/${id}/comment`);
	}

	create(comment: AppComment, target: EntityTarget) {
		return this.http.post(`api/${target.entityRepr.urlName}/${target.entityId}/comment`, { text: comment.text, id: comment.id });
	}
}
