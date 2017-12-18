import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectUser } from '../selectors/user.selector';
import { User } from '../model/user.model';
import { entityRepresentationMap } from '../utils/entities.utils';



@Injectable()
export class CustomFieldsService {
	user: User;

	constructor(private http: HttpClient, private store: Store<any>) {
		this.store.select(selectUser).subscribe(user => this.user = user);
	}

	private loadCustomFields() {
		return this.http.get(`api/team/${this.user.currentTeamId}/customFields`)
			.map(r => this.mapCustomFields(r));
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
				f.choices = r.enumerationsDef[enumName];
		}
	}
}
