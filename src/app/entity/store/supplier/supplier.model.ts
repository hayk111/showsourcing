import { Category } from '../category';
import { Tag } from '../tag';
import { AppImage } from '~app/entity';

// TODO audit is used everywhere move it where it makes sens
export interface Audit {
	createdBy?: any;
	creationDate?: any;
}

export interface Supplier {
	id?: string;
	name?: string;
	fullName?: string;
	description?: string;
	images?: AppImage[];
	logoImage?: AppImage;
	supplierType?: SupplierType;
	website?: string;
	phoneNumber?: string;
	country?: string;
	address?: string;
	officeEmail?: string;
	officePhone?: string;
	incoTerm?: string;
	harbour?: string;
	generalMOQ?: number;
	generalLeadTime?: number;
	tags?: Tag[];
	categories?: Category[];
	favorite?: boolean;
	globalDatabaseId?: string;
	audit?: Audit;
	deleted?: boolean;
}

export enum SupplierType {

}
