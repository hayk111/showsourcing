import { Typename } from '../typename.type';
import { Image } from './image.model';
import { ProjectProduct } from './project-product.model';
import { Team } from './team.model';
import { Entity } from './_entity.model';

export class Project extends Entity<Project> {
	__typename?: Typename = 'Project';
	id?: string;
	teamId?: string;
	team?: Team | null;
	name?: string;
	logoImage?: Image | null;
	description?: string | null;
	products?: {
		__typename?: 'ModelProjectProductConnection';
		items?: Array<ProjectProduct | null> | null;
		nextToken?: string | null;
		startedAt?: number | null;
	} | null;
}
