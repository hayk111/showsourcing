import { BaseEntity } from './_entity.model';
import { AppImage } from './app-image.model';
import { Product } from './product.model';


export class Project extends BaseEntity<ProjectConfig> {
	name: string;
	logoImage: AppImage;
	description: string;
	products: Product[];
	deleted: boolean;
}

export interface ProjectConfig {
	name: string;
	logoImage: AppImage;
	description: string;
}
