import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { EntityService, EntityTarget, ERM } from '~entity';

import { Project } from '../models/project.model';
import { EntityRepresentation } from './../../../shared/entity/models/entities.model';

@Injectable()
export class ProjectService {
	constructor(private http: HttpClient, private entitySrv: EntityService) {}

	load() {
		return this.entitySrv
			.load({ base: ERM.teams, loaded: ERM.projects, recurring: true })
			.pipe(map((t: any) => t.elements));
	}

	loadForTarget(target: EntityTarget) {
		return this.http.get(
			`api/${target.entityRepr.urlName}/${target.entityId}/project`
		);
	}

	addForTarget(project, target: EntityTarget) {
		return this.http.put(
			`api/${target.entityRepr.urlName}/${target.entityId}/project/${project.id}`,
			{}
		);
	}

	removeForTarget(project: Project, target: EntityTarget) {
		return this.http.delete(
			`api/${target.entityRepr.urlName}/${target.entityId}/project/${project.id}`
		);
	}

	getProductCount(entityRepr: EntityRepresentation, teamId: string) {
		// get urlName for said target
		let itemUrlName = entityRepr.urlName;
		// capitalizing because that url needs to be
		itemUrlName = itemUrlName.charAt(0).toUpperCase() + itemUrlName.slice(1);
		return this.http
			.get(`/api/team/${teamId}/countProdsBy${itemUrlName}`)
			.pipe(map((r: any) => r.items), startWith({}));
	}

	addProduct(projectid: String, productid: String) {
		return this.http.put(`api/project/${projectid}/product/${productid}`, {});
	}
	removeProduct(projectid: String, productid: String) {
		return this.http.delete(`api/project/${projectid}/product/${productid}`, {});
	}
}
