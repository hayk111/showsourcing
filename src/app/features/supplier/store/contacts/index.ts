import { ERM } from '~entity';
// import { makeEntityBundle } from '~entity/store/entity-bundle';

export interface Contact {
	name: string;
	email: string;
	phoneNumber: string;
	supplierId: string;
}

// export const CONTACT = makeEntityBundle(ERM.contact);
