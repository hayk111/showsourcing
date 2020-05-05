import { Typename } from '../typename.type';
import { Entity } from './_entity.model';

export class Export extends Entity<Export> {
	__typename?: Typename = 'Export';
	id?: string;
	teamId?: string;
	format?: any;
	target?: any | null;
	options?: string | null;
	query?: string | null;
	status?: any;
	documentUrl?: string | null;
	errors?: Array<string | null> | null;
}
