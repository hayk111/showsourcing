import { makeEntityActionTypes, ERM, EntityActions } from '~app/entity';

export interface Contact {
	name: string;
	email: string;
	phoneNumber: string;
	supplierId: string;
}

export const contactActionTypes = makeEntityActionTypes(ERM.contact);
export const contactActions = new EntityActions(contactActionTypes);
// make entity bundle  n gfn b  c
