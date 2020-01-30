import { EntityWithAudit } from '~core/erm/models/_entity.model';
import { AppImage } from '~core/erm/models/app-image.model';
import { Product } from '~core/erm/models/product.model';
import { User } from '~core/erm/models/user.model';

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
