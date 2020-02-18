import { Entity } from '~core/erm/models/_entity.model';
import { CreateProductInput } from 'app/API.service';
import { Supplier } from './supplier.model';
import { User } from './user.model';


export class Product extends Entity<CreateProductInput> {
	__typename= 'Product';
	name: string;
	team: string;
	supplier?: Supplier;
	description?: string;
	favorite?: string;
	assignee?: User;
	minimumOrderQuantity?: number;
	moqDescription?: string;
	score?: number;
	incoTerm?: string;
	harbour?: string;
	masterCbm?: number;
	quantityPer20ft?: number;
	quantityPer40ft?: number;
	quantityPer40ftHC?: number;
	leadTimeValue?: number;
	leadTimeUnit?: string;
	sample?: boolean;
	archived: boolean;
	reference?: string;
	referenceKey?: number;
	creationDate: Date;
	createdBy: User;
	deletedBy?: User;
	deletionDate?: Date;
	lastUpdatedDate: Date;
	deleted: boolean;

	constructor(config: CreateProductInput) {
		super(config);
	}
}
