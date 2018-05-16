import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '~app/entity/store/entity.service';
import { ERM } from '~app/entity/store/entity.model';
import { Patch } from '~app/entity/utils';

import { UserService } from '~app/features/user/services';

@Injectable()
export class TagHttpService {
	constructor(private http: HttpClient, private entitySrv: EntityService, private userSrv: UserService) { }

	load() {
		return this.entitySrv.load({ base: ERM.team, target: ERM.tag, recurring: true });
	}

	sendPatchRequest(p: Patch) {
		const patch = {
			[p.propName]: p.value,
		};
		return this.http.patch(`api/tag/${p.id}`, patch);
	}
}
