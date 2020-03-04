import { Entity } from './_entity.model';
import { TeamRole, Lang } from '../../../API.service';

export class TeamUser extends Entity<TeamUser> {
	__typename ?= 'TeamUser';
	teamId?: string;
	userId?: string;
	team?: {
		__typename?: 'Team';
		id?: string;
		name?: string;
		ownerUserId?: string;
		companyId?: string;
		createdByUserId?: string;
		createdAt?: number;
		lastUpdatedByUserId?: string;
		lastUpdatedAt?: number | null;
		_version?: number;
		_deleted?: boolean | null;
		_lastChangedAt?: number;
	} | null;
	user?: {
		__typename?: 'User';
		id?: string;
		email?: string;
		firstName?: string;
		lastName?: string;
		phoneNumber?: string | null;
		preferredLanguage?: Lang | null;
		avatar?: string | null;
		createdAt?: number | null;
		_version?: number;
		_deleted?: boolean | null;
		_lastChangedAt?: number;
	} | null;
	role?: TeamRole;
	_version?: number;
	_deleted?: boolean | null;
	_lastChangedAt?: number;
}

// TODO mission audits
