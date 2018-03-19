import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ERM, EntityService } from '~entity';
import { map } from 'rxjs/operators';
import { UserService } from '~app/features/user';
import { FieldType } from '~app/shared/_unused_/dynamic-forms';

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
			if (g.name === 'Basic info') g.fields.forEach(f => this.patchBasicInfo(f));
			else
				g.fields.forEach(f => {
					f.name = 'x-' + f.name;
					this.patchCustom(f, r);
				});
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
		switch (f.name) {
			case 'supplier':
				f.name = 'supplierId';
				f.fieldType = FieldType.SUPPLIER;
				break;
			case 'category':
				f.name = 'categoryId';
				f.fieldType = FieldType.CATEGORY;
				break;
			case 'event':
				f.name = 'eventId';
				f.fieldType = FieldType.EVENT;
				break;
			case 'name':
				f.fieldType = FieldType.TEXT;
				break;
			case 'priceAmount':
				f.fieldType = FieldType.PRICE;
				break;
			case 'description':
				f.fieldType = FieldType.TEXTAREA;
				break;
			case 'minimumOrderQuantity':
				f.fieldType = FieldType.NUMBER;
				f.label = 'MOQ';
				break;
		}
	}

	patchCustom(f, r) {
		switch (f.fieldType) {
			case 'supplier':
				f.fieldType = 'entitySelect';
				f.metadata = ERM.suppliers;
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
				choices = choices.map((c, i) => ({ id: c, name: c }));
				f.choices = choices;
		}
	}
}
