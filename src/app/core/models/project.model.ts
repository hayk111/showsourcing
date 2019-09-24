import { EntityWithAudit } from '~models/_entity.model';
import { AppImage } from '~models/app-image.model';
import { Product } from '~models/product.model';
import { User } from '~models/user.model';

export class Project extends EntityWithAudit<ProjectConfig> {
	name?: string;
	logoImage?: AppImage;
	description?: string;
	products?: Product[];
	owner?: User;
	done ?= false;
	dueDate?: Date;
	__typename ?= 'Project';
}

export interface ProjectConfig {
	name: string;
	logoImage?: AppImage;
	description?: string;
}
