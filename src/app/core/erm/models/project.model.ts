import { AppImage } from '~core/erm/models/app-image.model';
import { Product } from '~core/erm/models/product.model';
import { User } from '~core/erm/models/user.model';
import { Entity } from './_entity.model';

export class Project extends Entity<Project> {
	name?: string;
	logoImage?: AppImage;
	description?: string;
	products?: Product[];
	owner?: User;
	// done ?= false;
	dueDate?: Date;
	__typename ?= 'Project';
}
