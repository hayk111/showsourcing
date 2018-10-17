import { Attachment } from '~models/attachment.model';
import { uuid } from '~utils';


export class SupplierClaim {
	id: string;
	globalSupplierId?: string;
	name?: string;
	country?: string;
	street?: string;
	city?: string;
	zipCode?: string;
	businessType?: string;
	categories?: string;
	description?: string;
	attachment?: Attachment[];
	qrCode?: boolean;
	// contact info
	contactEmail?: string;
	contactPhone?: string;
	wechat?: string;
	whatsapp?: string;
	website?: string;
	// account
	accountEmail?: string;
	accountPhone: string;
	password?: string;
	firstName?: string;
	lastName?: string;

	constructor() {
		this.id = uuid();
	}
}

