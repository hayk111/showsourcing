import { Injectable } from '@angular/core';
import { EntityService } from '~entity';
import { UserService } from '~user';

@Injectable()
export class TeamHttpService {

	load() {
		return this.entitySrv.load( { url: `api/user/${this.userSrv.userId}/team`, recurring: true });
	}

	constructor(private entitySrv: EntityService, private userSrv: UserService) {}
}
