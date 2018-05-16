import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityService } from '~app/entity/store/entity.service';
import { ERM } from '~app/entity/store/entity.model';
import { map } from 'rxjs/operators';
import { UserService } from '~app/features/user/services/user.service';
import { PropType } from './custom-field.model';

@Injectable()
export class CustomFieldsHttpService {
	constructor(private entitySrv: EntityService, private userSrv: UserService) { }

	load() {
		return this.entitySrv
			.load({ base: ERM.team, target: ERM.customField, recurring: true })
			.pipe(map(r => this.mapCustomFields(r)));
	}

	mapCustomFields(r) {
		// we patch the product cfdef
		r.productsCFDef.groups.forEach(g => {
			// we need to remove rating as its not used in the custom fields
			g.fields = g.fields.filter(f => f.name !== 'rating');
			g.fields.forEach(f => this.patchBasicInfo(f));
		});
		// we need to return an array of entities
		// first we delete the teamId from the object
		delete r.teamId;
		// then we add an id to each entries
		Object.entries(r).forEach(([k, v]: any) => (v.id = k));
		// then we return an array
		return Object.values(r);
	}

	// TODO : ask back end for real descriptor so no more patch needed
	// yup, atm we need to patch the
	// descriptor for it to work with the api that is used here.
	private patchDescriptor(desc) {
		desc.productsCFDef.groups.forEach(g => {
			if (g.name === 'Basic info') this.patchBasicInfo(g.fields);
		});
		return desc;
	}

	private patchBasicInfo(f) {
		if (f.fieldType === 'standard') {
			switch (f.name) {
				case 'supplier':
					f.propName = 'supplierId';
					f.propType = PropType.SUPPLIER;
					break;
				case 'category':
					f.propName = 'categoryId';
					f.propType = PropType.CATEGORY;
					break;
				case 'event':
					f.propName = 'eventId';
					f.propType = PropType.EVENT;
					break;
				case 'name':
					f.propName = f.name;
					f.propType = PropType.TEXT;
					break;
				case 'status':
					f.propName = f.name;
					f.propType = PropType.PRODUCT_STATUS;
					break;
				case 'tags':
					f.propName = 'tagIds';
					f.propType = PropType.TAG;
					break;
				case 'projects':
					f.propName = 'projectIds';
					f.propType = PropType.PROJECT;
					break;
				case 'priceAmount':
					f.propName = f.name;
					f.propType = PropType.PRICE;
					f.label = 'Price';
					break;
				case 'priceCurrency':
					f.propName = f.name;
					f.propType = PropType.CURRENCY;
					break;
				case 'description':
					f.propName = f.name;
					f.propType = PropType.TEXTAREA;
					break;
				case 'minimumOrderQuantity':
					f.propName = f.name;
					f.propType = PropType.NUMBER;
					break;
				default:
					f.propName = f.name;
					f.propType = f.name;
			}
		} else {
			f.propName = f.name;
			f.propType = f.fieldType;
		}
	}
}
