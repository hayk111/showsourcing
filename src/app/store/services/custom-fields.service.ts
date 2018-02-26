import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { entityRepresentationMap } from '../utils/entities.utils';
import { map } from 'rxjs/operators';



@Injectable()
export class CustomFieldsService {

	constructor(private http: HttpClient) {
	}

	load(id, counter) {
		return this.http.get(`api/team/${id}/customFields?counter=${counter}`).pipe(
			map(r => this.mapCustomFields(r))
		);
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
	// yup there is a lot of ugly stuff down there but we need to patch the
	// descriptor for it to work with the api that is used here.
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