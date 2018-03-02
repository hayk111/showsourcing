import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '~entity';
import { UserService } from '~app/features/user';


@Injectable()
export class CategoryService {

	constructor(private entitySrv: EntityService, private userSrv: UserService) {
	}

	load() {
		return this.entitySrv.load( { url: `api/team/${this.userSrv.teamId}/category`, recurring: true } );
	}
}
