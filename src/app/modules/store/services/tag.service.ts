import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../selectors/user.selector';
import { User } from '../model/user.model';


@Injectable()
export class TagService {
	teamId: string;
	constructor(private http: HttpClient, private store: Store<any>) {
		this.store.select(selectUser).subscribe((user: User) => this.teamId = user.currentTeamId);
	}

	load(maxCounter) {
		return this.http.get(`api/team/${this.teamId}/tag?counter=${maxCounter}`);
	}
}
