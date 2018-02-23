import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../../user/models/user.model';

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
