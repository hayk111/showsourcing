import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { selectUser } from '../selectors/entities/user.selector';
import { User } from '../model/entities/user.model';
import { Vote } from '../model/entities/vote.model';
import { uuid } from '../utils/uuid.utils';
import { EntityTarget } from '../utils/entities.utils';
import { tap } from 'rxjs/operators';



@Injectable()
export class VoteService {
	user;
	constructor(private http: HttpClient, private store: Store<any>) {
		this.store.select(selectUser)
			.subscribe((user: User) => this.user = user);
	}

	getPendingVote(vote: Vote): Vote {
		const id = uuid();
		const userId = this.user.id;
		return { ...vote, id, userId };
	}

	load(target: EntityTarget) {
		const name = target.entityRepr.urlName;
		const id = target.entityId;
		return this.http.get(`api/${name}/${id}/vote`).pipe(
			// adding the target so we find votes easily for a target
			tap((votes: Array<Vote>) => votes.forEach(v => v.target = target))
		);
	}

	postVote(vote: Vote) {
		return this.http.post(`api/product/${vote.target.entityId}/vote`, vote);
	}
}
