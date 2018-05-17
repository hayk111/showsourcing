import { Audit } from './audit.model';
import { uuid } from '~utils';
import { Entity } from './_entity.model';

export class Tag extends Entity<Tag> {
	name?: string;
	deleted?: boolean;
}