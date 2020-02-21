import { Entity } from './_entity.model';

export class Attachment extends Entity<Attachment> {
	fileName ?: string;
	url?: string;
	size?: number;
	pending?: boolean;
	__typename ?= 'Attachment';
}

