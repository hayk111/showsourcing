import { Typename } from '../typename.type';
import { Entity } from './_entity.model';
import { HelperType } from '../API.service';

export class HelperList extends Entity<HelperList> {
	__typename?: Typename = 'HelperList';
	id?: string;
	helperType?: HelperType | null;
	code?: string;
	label?: string;
}
