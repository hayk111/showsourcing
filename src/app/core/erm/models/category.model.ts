import { Entity } from '~core/erm/models/_entity.model';
import { CreateCategoryInput } from '../../../API.service';
import { User } from './user.model';

export class Category extends Entity<CreateCategoryInput> {
	__typename: string = 'Category';
	teamId: string;
	name: string;
	creationDate: number;
	deletionDate?: number;
	lastUpdatedBy?: User;
	lastUpdatedDate: number;
}
