import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityTarget, EntityService, ERM, Patch } from '~entity';
import { Tag } from '../model/entities/tag.model';
import { UserService } from '~user';

@Injectable()
export class TagService {
	constructor(private http: HttpClient, private entitySrv: EntityService, private userSrv: UserService) {}

	load() {
		return this.entitySrv.load({ base: ERM.teams, target: ERM.tags, recurring: true });
	}

	sendPatchRequest(p: Patch) {
		const patch = {
			[p.propName]: p.value,
		};
		return this.http.patch(`api/tag/${p.id}`, patch);
	}
}
