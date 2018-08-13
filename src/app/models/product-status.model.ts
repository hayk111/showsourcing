import { ProductStatusType } from '~models/product-status-type.model';
import { BaseEntity } from '~models/_entity.model';
import { User } from '~models/user.model';

export class ProductStatus extends BaseEntity<ProductStatusConfig> {
	status?: ProductStatusType;
	cancelled?= false;
	comment?: Comment;
	deletedBy?: User;
	deletionDate?: string;
}

export interface ProductStatusConfig {
	status: ProductStatusType;
}
