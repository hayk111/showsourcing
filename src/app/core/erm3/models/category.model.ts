import { Typename } from '../typename.type';
import { Team } from './team.model';
import { User } from './user.model';
import { Entity } from './_entity.model';

export class Category extends Entity<Category> {
	__typename?: Typename = 'Category';
	id?: string;
	teamId?: string;
	team?: Team;
	name?: string;
}
