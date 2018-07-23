import { BaseEntity } from '~models/_entity.model';

export class Category extends BaseEntity<CategoryConfig> implements CategoryConfig {
	name: string;
}

export interface CategoryConfig {
	name: string;
}
