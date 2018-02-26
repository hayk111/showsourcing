import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { User } from '~user/models/user.model';
import { selectUser } from '~user/store/selectors/user.selector';

import { Vote } from '../model/entities/vote.model';
import { EntityTarget } from '../utils/entities.utils';

@Injectable()
export class VoteService {
	user;
	constructor(private http: HttpClient, private store: Store<any>) {
		this.store.select(selectUser).subscribe((user: User) => (this.user = user));
	}

	load(target: EntityTarget) {
		const name = target.entityRepr.urlName;
		const id = target.entityId;
		// TODO API: votes should have an id...
		return this.http
			.get(`api/${name}/${id}/vote`)
			.pipe(tap((votes: Array<any>) => votes.forEach((v, i) => (v.id = i))));
	}

	create({ vote, target }: { vote: Vote; target: EntityTarget }) {
		if (vote.productId) return this.http.post(`api/product/${vote.productId}/vote`, vote);
		else return this.http.post(`api/product/${target.entityId}/vote`, vote);
	}
}