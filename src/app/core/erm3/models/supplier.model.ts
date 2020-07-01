import { Typename } from '../typename.type';
import { Team } from './team.model';
import { Entity } from './_entity.model';
import { WorkflowStatus } from './workflow-status.model';

export class Supplier extends Entity<Supplier> {
	__typename?: Typename = 'Supplier';
	favorite ? = false;
	archived ? = false;

	id?: string;
	teamId?: string;
	team?: Team;
	name?: string;
	fullName?: string | null;
	tradingName?: string | null;
	description?: string | null;
	website?: string | null;
	phoneNumber?: string | null;
	country?: string | null;
	city?: string | null;
	address?: string | null;
	officeEmail?: string | null;
	officePhone?: string | null;
	incoTerm?: string | null;
	harbour?: string | null;
	generalMOQ?: number | null;
	generalLeadTime?: number | null;
	globalDatabaseId?: string | null;
	reference?: string | null;
	score?: number | null;
	referenceKey?: number | null;
	images?: any;
	comments?: any;
	status?: WorkflowStatus;
}
