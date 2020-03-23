import { Typename } from '../typename.type';
import { Entity } from './_entity.model';

export class ProjectProduct extends Entity<ProjectProduct> {
	__typename?: Typename = 'ProjectProduct';
	id?: string;
	teamId?: string;
	projectId?: string;
	productId?: string;
}
