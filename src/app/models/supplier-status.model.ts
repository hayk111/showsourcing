import { SupplierStatusType } from '~models/supplier-status-type.model';
import { BaseEntity } from '~models/_entity.model';
import { User } from '~models/user.model';

export class SupplierStatus extends BaseEntity<SupplierStatusConfig> {
	status?: SupplierStatusType;
	cancelled?= false;
	comment?: Comment;
	deletedBy?: User;
	deletionDate?: string;
}

export interface SupplierStatusConfig {
	status: SupplierStatusType;
}
