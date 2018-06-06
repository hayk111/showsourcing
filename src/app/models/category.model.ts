import { BaseEntity } from './_entity.model';

export class Category extends BaseEntity<CategoryConfig> {
	name: string;
}

export interface CategoryConfig {
	name: string;
}
