import { EntityWithAudit } from '~core/ORM/models/_entity.model';
import { AppImage } from '~core/ORM/models/app-image.model';
import { Product } from '~core/ORM/models/product.model';
import { User } from '~core/ORM/models/user.model';

export class Project extends EntityWithAudit<ProjectConfig> {
	name?: string;
	logoImage?: AppImage;
	description?: string;
	products?: Product[];
	owner?: User;
	// done ?= false;
	dueDate?: Date;
	__typename ?= 'Project';
}

export interface ProjectConfig {
	name: string;
	logoImage?: AppImage;
	description?: string;
}
