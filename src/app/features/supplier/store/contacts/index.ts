import { makeEntityActionTypes, ERM } from '~app/entity';

export interface Contact {
	name: string;
	email: string;
	phoneNumber: string;
	supplierId: string;
}
export const contactActionTypes = makeEntityActionTypes(ERM.contact);
