import { Entity } from './_entity.model';
import { Typename } from '../typename.type';

export class Industry extends Entity<Industry> {
	__typename?: Typename = 'Industry';
	id?: string;
	name?: string;
}
