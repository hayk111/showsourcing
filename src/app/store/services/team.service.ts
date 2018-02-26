import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '~user/store/selectors/user.selector';

@Injectable()
export class TeamService {
	userId: string;

	load(maxCounter: number) {
		return this.http.get(`api/user/${this.userId}/team?counter=${maxCounter}`);
	}

	constructor(private http: HttpClient, private store: Store<any>) {
		this.store.select(selectUser).subscribe(user => (this.userId = user.id));
	}
}
