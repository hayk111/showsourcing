import { SupplierStatusType } from '~models/supplier-status-type.model';
import { EntityWithAudit } from '~models/_entity.model';
import { User } from '~models/user.model';

export class SupplierStatus extends EntityWithAudit<SupplierStatusConfig> {
	status?: SupplierStatusType;
	cancelled ?= false;
	comment?: Comment;
	deletedBy?: User;
	deletionDate?: string;
	__typename ?= 'SupplierStatus';
}

export interface SupplierStatusConfig {
	status: SupplierStatusType;
}
