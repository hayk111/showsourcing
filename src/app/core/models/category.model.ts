import { EntityWithAudit } from '~models/_entity.model';

export interface CategoryConfig {
	name: string;
}

export class Category extends EntityWithAudit<CategoryConfig> implements CategoryConfig {
	name: string;
	__typename ?= 'Category';
}
