import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { entityRepresentationMap, EntityTarget } from '../utils/entities.utils';



@Injectable()
export class CustomFieldsService {

	constructor(private http: HttpClient) {
	}

	load(id, counter) {
		return this.http.get(`api/team/${id}/customFields?counter=${counter}`)
			.map(r => this.mapCustomFields(r));
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

	mapCustomFields(r) {
		r.productsCFDef.groups.forEach(g => {
			if (g.name === 'Basic info')
				g.fields.forEach(f => this.patchBasicInfo(f) );
			else
				g.fields.forEach(f => {
					f.name = 'x-' + f.name;
					this.patchCustom(f, r);
				});
		});
		return r;
	}

	// TODO : no patch needed
	private patchDescriptor(desc) {
		desc.productsCFDef.groups.forEach(g => {
			if (g.name === 'Basic info')
				this.patchBasicInfo(g.fields);
		});
		return desc;
	}

	private patchBasicInfo(f) {
		switch (f.name) {
			case 'supplier':
				f.name = 'supplierId';
				f.fieldType = 'entitySelect';
				f.metadata = entityRepresentationMap.suppliers;
				break;
			case 'category':
				f.name = 'categoryId';
				f.fieldType = 'entitySelect';
				f.metadata = entityRepresentationMap.categories;
				break;
			case 'event':
				f.name = 'eventId';
				f.fieldType = 'entitySelect';
				f.metadata = entityRepresentationMap.events;
				break;
			case 'name':
				f.fieldType = 'text';
				break;
			case 'rating':
				f.fieldType = 'rating';
				break;
			case 'priceAmount':
				f.fieldType = 'price';
				break;
			// case 'priceCurrency':
			// 	f.fieldType = 'currency';
			// 	f.label = 'currency';
			// 	break;
			case 'description':
				f.fieldType = 'textarea';
				break;
			case 'minimumOrderQuantity':
				f.fieldType = 'number';
				f.label = 'MOQ';
				f.fieldName = 'minimumOrderQuantity';
				break;
		}
	}

	patchCustom(f, r) {
		switch (f.fieldType) {
			case 'supplier':
				f.fieldType = 'entitySelect';
				f.metadata = entityRepresentationMap.suppliers;
				break;
			case 'free-text':
				f.fieldType = 'text';
				break;
			case 'text-zone':
				f.fieldType = 'textarea';
				break;
			case 'price':
			case 'decimal-number':
				f.fieldType = 'decimal';
				break;
			case 'multiple-choice':
				const enumName = f.enumerationName;
				let choices = r.enumerationsDef[enumName];
				// id of multiple choice is the same as name
				// because radio values gives back an id and the api
				// is waiting for a name
				choices = choices.map((c, i) => ({ id: c, name: c}));
				f.choices = choices;
		}
	}
}
