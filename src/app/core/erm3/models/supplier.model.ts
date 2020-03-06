import { Typename } from '../entity-name.type';
import { Team } from './team.model';
import { Entity } from './_entity.model';

export class Supplier extends Entity<Supplier> {
	__typename?: Typename = 'Supplier';
	favorite ?= false;
	archived ?= false;

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
	referenceKey?: number | null;
	createdAt?: number;
	createdByUserId?: string;
	deletedByUSerId?: string | null;
	deletedAt?: number | null;
	lastUpdatedByUserId?: string;
	lastUpdatedAt?: number;
	deleted?: boolean;
	_version?: number;
	_deleted?: boolean | null;
	_lastChangedAt?: number;
}
