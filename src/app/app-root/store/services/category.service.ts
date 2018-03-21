import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '~entity';
import { UserService } from '~app/features/user';
import { ERM } from '~app/shared/entity/models';

@Injectable()
export class CategoryService {
	constructor(private entitySrv: EntityService, private userSrv: UserService) {}

	load() {
		return this.entitySrv.load({ base: ERM.teams, target: ERM.categories, recurring: true });
	}
}
