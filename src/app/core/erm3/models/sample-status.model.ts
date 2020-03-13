import { Typename } from '../typename.type';
import { Entity } from './_entity.model';
import { Team } from './team.model';

export class SampleStatus extends Entity<SampleStatus> {
	__typename?: Typename = 'SampleStatus';
	id?: string;
	teamId?: string;
	team?: Team | null;
	name?: string | null;
	inWorkflow?: boolean;
	category?: string;
	step?: number;
	final?: boolean;
}
