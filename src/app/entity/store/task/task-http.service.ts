import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ERM, EntityTarget } from '~entity/store/entity.model';
import { EntityService } from '~entity/store/entity.service';
import { FilterGroupName } from '~shared/filters';

@Injectable()
export class TaskHttpService {
	private repr = ERM.tasks;
	private teamId;

	constructor(private http: HttpClient, private entitySrv: EntityService) { }

	load(filterGroupName: FilterGroupName) {
		return this.entitySrv.load({ base: ERM.teams, target: ERM.tasks }).pipe(
			map((r: any) => r.elements),
			// we need to add the id to adhere to the standard fixed on the client
			// where relations are given with Ids. The response gives back the whole product,
			// we only care about the id.
			tap(tasks => {
				tasks.forEach(t => (t.productId = t.product.id));
			})
		);
	}

	loadForTarget(target: EntityTarget) {
		const name = target.entityRepr.urlName;
		const id = target.entityId;
		return this.http.get(`api/${name}/${id}/task`);
	}

	sendPatchRequest(payload) {
		return this.http.patch(`api/team/${payload.id}`, { [payload.propName]: payload.value });
	}
}
