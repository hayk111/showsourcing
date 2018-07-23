import { uuid } from '~utils';
import { BaseEntity } from '~models/_entity.model';

export class Tag extends BaseEntity<TagConfig> {
	name?: string;
	deleted?: boolean;
}

export interface TagConfig {
	name: string;
}
