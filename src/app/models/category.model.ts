import { EntityWithAudit } from '~models/_entity.model';

export class Category extends EntityWithAudit<CategoryConfig> implements CategoryConfig {
	name: string;
}

export interface CategoryConfig {
	name: string;
}
