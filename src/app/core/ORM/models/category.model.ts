import { EntityWithAudit } from '~models/_entity.model';

export interface CategoryConfig {
	id?: string;
	name?: string;
}

export class Category extends EntityWithAudit<CategoryConfig> implements CategoryConfig {
	name: string;
	__typename ?= 'Category';
}
