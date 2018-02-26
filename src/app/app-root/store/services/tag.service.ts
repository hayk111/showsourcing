import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityTarget } from '../utils/entities.utils';
import { Tag } from '../model/entities/tag.model';


@Injectable()
export class TagService {

	constructor(private http: HttpClient) {
	}

	load(id, maxCounter) {
		return this.http.get(`api/team/${id}/tag?counter=${maxCounter}`);
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
