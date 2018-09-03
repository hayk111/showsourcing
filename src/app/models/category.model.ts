import { EntityWithAudit } from '~models/_entity.model';

export class Category extends EntityWithAudit<CategoryConfig> implements CategoryConfig {
	name: string;
	__typename ?= 'Category';
}

export interface CategoryConfig {
	name: string;
}
