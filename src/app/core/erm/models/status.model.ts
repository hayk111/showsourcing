import { Entity } from './_entity.model';

export class Status extends Entity<Status> {
	name?: string;
	category?: string;
	step?: number;
	inWorkflow ?= true;
	final ?= false;
	deleted ?= false;
}
