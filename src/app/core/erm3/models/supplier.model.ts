import { TeamInput } from '../../../API.service';
import { Entity } from './_entity.model';

export class Supplier extends Entity<Supplier> {
	__typename ?= 'Supplier';
	favorite? = false;
	archived? = false;

	lastUpdatedByUserId?: string | null;
	createdByUserId?: string | null;

	id?: string;
	teamId?: string | null;
	team?: TeamInput | null;
	name?: string | null;
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
	referenceKey?: number | null;
	deletionDate?: number | null;
	deletedByUSerId?: string | null;
	_version?: number | null;
}
