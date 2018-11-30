import { EntityWithAudit } from '~models/_entity.model';

export class ProductStatus {
	id: string;
	name: string;
	inWorkflow: boolean;
	category: string;
	step: number;

	__typename?= 'ProductStatus';
}

