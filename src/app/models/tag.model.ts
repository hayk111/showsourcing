import { uuid } from '~utils';
import { EntityWithAudit } from '~models/_entity.model';

export class Tag extends EntityWithAudit<TagConfig> {
	name?: string;
	deleted?: boolean;
}

export interface TagConfig {
	name: string;
}
