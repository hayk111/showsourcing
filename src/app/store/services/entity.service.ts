import { Injectable } from '@angular/core';
import { EntityRepresentation, EntityTarget, Entity } from '../utils/entities.utils';
import { HttpClient } from '@angular/common/http';
import { Log } from '~utils/index';


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

	// this could be moved in each of the entity service in the future if this adds problems.
	sendPatchRequest({target, propName, value}: {target: EntityTarget, propName: string, value: any }) {
		let patch = { [propName]: value };
		const id = target.entityId;
		const urlName = target.entityRepr.urlName;
		// check for customFields
		// TODO: custom fields should already have a x- when coming from backend.
		if (propName.startsWith('x-')) {
			const realPropName = propName.substr(2);
			patch = { customFields : { [realPropName]: { value : value} }};
		}
		// TODO: this should be handled differently
		// need to check if it's price because it's handled this way @ backend
		// and in the front end when the field is price amount the value
		// is automatically { priceAmount: x, currency: y }
		if (propName === 'priceAmount')
			patch = value;
		return this.http.patch(`api/${urlName}/${id}`, patch);
	}

	// deletes item...
	deleteItem(target) {
		return this.http.delete(`api/${target.entityRepr.urlName}/${target.entityId}`);
	}

	merge({ items, target }) {

	}
}
