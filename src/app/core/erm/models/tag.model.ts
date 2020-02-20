import { Entity } from '~core/erm/models/_entity.model';

export class Tag extends Entity<Tag> {
	name?: string;
	deleted?: boolean;
	__typename ?= 'Tag';
}
