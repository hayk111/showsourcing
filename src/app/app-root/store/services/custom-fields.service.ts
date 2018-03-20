import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ERM, EntityService } from '~entity';
import { map } from 'rxjs/operators';
import { UserService } from '~app/features/user';
import { PropType } from '~app/shared/_unused_/dynamic-forms';

@Injectable()
export class CustomFieldsService {
	constructor(private entitySrv: EntityService, private userSrv: UserService) {}

	load() {
		return this.entitySrv
			.load({ base: ERM.teams, loaded: ERM.customFields, recurring: true })
			.pipe(map(r => this.mapCustomFields(r)));
	}

	mapCustomFields(r) {
		// we patch the product cfdef
		r.productsCFDef.groups.forEach(g => {
			g.fields = g.fields.filter(f => f.name !== 'priceCurrency' && f.name !== 'rating');
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

	// TODO : no patch needed
	// yup there is a lot of ugly stuff down there but we need to patch the
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
					f.propName = 'price';
					f.propType = PropType.PRICE;
					f.label = 'Price';
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
					f.propType = f.fieldType;
			}
		} else {
			f.propName = f.name;
			f.propType = f.fieldType;
		}
	}
}
