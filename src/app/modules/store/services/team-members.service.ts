import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectUser } from '../selectors/entities/user.selector';
import { User } from '../model/entities/user.model';

@Injectable()
export class TeamMembersService {

	load(id: string, maxCounter: number) {
			return this.http.get(`api/team/${id}/user?counter=${maxCounter}`).pipe(
				tap((users: Array<User>) => users.forEach(user => user.name = user.firstName + ' ' + user.lastName))
			);
	}

	constructor(private http: HttpClient) {
	}

}
