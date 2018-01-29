import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamItemLoaderService } from './team-item-loader.service';
import { FilterGroupName } from '../model/misc/filter.model';
import { entityRepresentationMap, EntityTarget } from '../utils/entities.utils';

@Injectable()
export class TaskService {

	private baseUrl = `api/task/`;
	private repr = entityRepresentationMap.tasks;

	constructor(private http: HttpClient, private teamItemLoader: TeamItemLoaderService) { }

	load(filterGroupName: FilterGroupName) {
		return this.teamItemLoader.load(this.repr, filterGroupName).map(r => r.elements);
	}

	loadForTarget(target: EntityTarget) {
		const name = target.entityRepr.urlName;
		const id = target.entityId;
		return this.http.get(`api/${name}/${id}/vote`);
	}


	sendPatchRequest(payload) {
		return this.http.patch(`${this.baseUrl}${payload.id}`, { [payload.propName]: payload.value});
	}

}
