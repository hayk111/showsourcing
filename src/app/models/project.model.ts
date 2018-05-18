import { BaseEntity } from './_entity.model';
import { AppImage } from './app-image.model';
import { Product } from './product.model';


export class Project extends BaseEntity<Project> {
	name: string;
	logoImage: AppImage;
	description: string;
	products: Product[];
	deleted: boolean;
}