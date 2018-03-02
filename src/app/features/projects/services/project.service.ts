import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { EntityTarget, EntityService } from '~entity';

import { Project } from '../models/project.model';
import { UserService } from '~app/features/user';

@Injectable()
export class ProjectService {
	constructor(private http: HttpClient, private entitySrv: EntityService, private userSrv: UserService) {}

	load() {
		return this.entitySrv.load({ url: `api/team/${this.userSrv.teamId}/project`, recurring: true })
			.pipe(map((t: any) => t.elements));
	}

	loadForTarget(target: EntityTarget) {
		return this.http.get(`api/${target.entityRepr.urlName}/${target.entityId}/project`);
	}

	addForTarget(project, target: EntityTarget) {
		return this.http.put(`api/${target.entityRepr.urlName}/${target.entityId}/project/${project.id}`, {});
	}

	removeForTarget(project: Project, target: EntityTarget) {
		return this.http.delete(`api/${target.entityRepr.urlName}/${target.entityId}/project/${project.id}`);
	}
}
