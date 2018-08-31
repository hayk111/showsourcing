import { EntityWithAudit } from '~models/_entity.model';

export class Comment extends EntityWithAudit<CommentConfig> {
	id: string;
	text: string;

	constructor(config: CommentConfig) {
		super(config);
	}
}

export interface CommentConfig {
	text: string;
}
