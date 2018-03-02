import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityTarget, EntityService, ERM } from '~entity';
import { Tag } from '../model/entities/tag.model';
import { UserService } from '~user';

@Injectable()
export class TagService {
	constructor(private http: HttpClient, private entitySrv: EntityService, private userSrv: UserService) {}

	load() {
		return this.entitySrv.load({ base: ERM.teams, loaded: ERM.tags, recurring: true });
	}

	loadForTarget(target: EntityTarget) {
		return this.http.get(`api/${target.entityRepr.urlName}/${target.entityId}/tag`);
	}

	addForTarget(tag: Tag, target: EntityTarget) {
		return this.http.put(`api/${target.entityRepr.urlName}/${target.entityId}/tag/${tag.id}`, {});
	}

	removeForTarget(tag: Tag, target: EntityTarget) {
		return this.http.delete(`api/${target.entityRepr.urlName}/${target.entityId}/tag/${tag.id}`);
	}
}
