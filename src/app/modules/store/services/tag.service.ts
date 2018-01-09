import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../selectors/user.selector';
import { User } from '../model/user.model';
import { EntityTarget } from '../utils/entities.utils';


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
}
