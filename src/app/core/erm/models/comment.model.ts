import { Entity } from './_entity.model';

export class Comment extends Entity<Comment> {
	text?: string;
	__typename ?= 'Comment';
}

