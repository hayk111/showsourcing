import { BaseEntity } from '~models';

export class Comment extends BaseEntity<CommentConfig> {
	id: string;
	text: string;

	constructor(config: CommentConfig) {
		super(config);
	}
}

export interface CommentConfig {
	text: string;
}
