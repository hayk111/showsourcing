import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { EntityService } from '~entity';
import { User } from '../user';
import { UserService } from '~app/features/user';

@Injectable()
export class TeamMembersHttpService {

	load() {
		return this.entitySrv.load({ url: `api/team/${this.userSrv.teamId}/user` })
			.pipe(tap((users: Array<User>) => users.forEach(user => (user.name = user.firstName + ' ' + user.lastName))));
	}

	constructor(private entitySrv: EntityService, private userSrv: UserService) { }
}
