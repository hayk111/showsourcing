import { ProductStatusType } from '~models/product-status-type.model';
import { EntityWithAudit } from '~models/_entity.model';
import { User } from '~models/user.model';

export class ProductStatus extends EntityWithAudit<ProductStatusConfig> {
	status?: ProductStatusType;
	cancelled? = false;
	comment?: Comment;
	deletedBy?: User;
	deletionDate?: string;
}

export interface ProductStatusConfig {
	status: ProductStatusType;
}
