import { EntityWithAudit } from '~core/erm/models/_entity.model';

export class Tag extends EntityWithAudit<TagConfig> {
	name?: string;
	deleted?: boolean;
	__typename?= 'Tag';
}

export interface TagConfig {
	name: string;
}
