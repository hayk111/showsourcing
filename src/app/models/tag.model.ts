import { Audit } from './audit.model';
import { uuid } from '~utils';
import { BaseEntity } from './_entity.model';

export class Tag extends BaseEntity<Tag> {
	name?: string;
	deleted?: boolean;
}