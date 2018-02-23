import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { EntityTarget } from '../../store/utils/entities.utils';
import { Project } from '../models/project.model';


@Injectable()
export class ProjectService {

	constructor(private http: HttpClient) {
	}

	load(id, maxCounter) {
		return this.http.get(`api/team/${id}/project?counter=${maxCounter}`).pipe(
			map((t: any) => t.elements)
		);
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
