import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '~entity/store/entity.service';
import { UserService } from '~app/features/user/services';
import { ERM } from '~entity/store/entity.model';

@Injectable()
export class CategoryHttpService {
	constructor(private entitySrv: EntityService, private userSrv: UserService) { }

	load() {
		return this.entitySrv.load({ base: ERM.team, target: ERM.category, recurring: true });
	}
}
