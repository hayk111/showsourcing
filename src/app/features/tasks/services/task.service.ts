import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamItemLoaderService } from '~store/services/team-item-loader.service';
import { FilterGroupName } from '~shared/filters';
import { entityRepresentationMap, EntityTarget } from '~store/utils/entities.utils';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class TaskService {

	private baseUrl = `api/task/`;
	private repr = entityRepresentationMap.tasks;

	constructor(private http: HttpClient, private teamItemLoader: TeamItemLoaderService) { }

	load(filterGroupName: FilterGroupName) {
		return this.teamItemLoader.load(this.repr, filterGroupName).pipe(
			map(r => r.elements),
			// we need to add the id to adhere to the standard fixed on the client
			// where relations are given with Ids. The response gives back the whole product,
			// we only care about the id.
			tap(tasks => { tasks.forEach(t => t.productId = t.product.id )})
		);
	}

	loadForTarget(target: EntityTarget) {
		const name = target.entityRepr.urlName;
		const id = target.entityId;
		return this.http.get(`api/${name}/${id}/task`);
	}


	sendPatchRequest(payload) {
		return this.http.patch(`${this.baseUrl}${payload.id}`, { [payload.propName]: payload.value});
	}

}
