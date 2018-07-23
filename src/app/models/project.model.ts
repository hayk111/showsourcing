import { BaseEntity } from '~models/_entity.model';
import { AppImage } from '~models/app-image.model';
import { Product } from '~models/product.model';


export class Project extends BaseEntity<ProjectConfig> {
	name?: string;
	logoImage?: AppImage;
	description?: string;
	products?: Product[];
	deleted?: boolean;
	productCount?: number;
}

export interface ProjectConfig {
	name: string;
	logoImage?: AppImage;
	description?: string;
}
