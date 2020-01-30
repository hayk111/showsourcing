import { EntityWithAudit } from '~models/_entity.model';

export class Comment extends EntityWithAudit<CommentConfig> {
	id: string;
	text: string;
	__typename ?= 'Comment';


	constructor(config: CommentConfig) {
		super(config);
	}
}

export interface CommentConfig {
	id?: string;
	text?: string;
}
