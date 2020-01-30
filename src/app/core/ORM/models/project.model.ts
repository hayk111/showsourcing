import { EntityWithAudit } from '~core/orm/models/_entity.model';
import { AppImage } from '~core/orm/models/app-image.model';
import { Product } from '~core/orm/models/product.model';
import { User } from '~core/orm/models/user.model';

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
