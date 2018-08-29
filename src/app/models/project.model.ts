import { EntityWithAudit } from '~models/_entity.model';
import { AppImage } from '~models/app-image.model';
import { Product } from '~models/product.model';


export class Project extends EntityWithAudit<ProjectConfig> {
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
