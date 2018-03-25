import { Injectable } from '@angular/core';
import { EntityRepresentation, EntityTarget, Entity } from '~entity';
import { HttpClient } from '@angular/common/http';
import { Log } from '~utils/index';
import { Resolver } from '~app/app-root/utils/resolver.class';

// TODO: cedric should be removed.
// @Deprecated don't use. Use the other EntityService
@Injectable()
export class EntityService {
	constructor(private http: HttpClient) {
		Log.debug('[EntityService] constructor');
	}

	loadForTarget(toLoad: EntityRepresentation, target: EntityTarget) {
		return this.http.get(`api/${target.entityRepr.urlName}/${target.entityId}/${toLoad.urlName}`);
	}

	addForTarget(toAdd: Entity, repr: EntityRepresentation, target: EntityTarget) {
		return this.http.post(`api/${target.entityRepr.urlName}/${target.entityId}/${repr.urlName}`, toAdd);
	}

	// deletes item...
	deleteItem(target) {
		return this.http.delete(`api/${target.entityRepr.urlName}/${target.entityId}`);
	}

	merge({ items, target }) { }
}
