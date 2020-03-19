
import { Typename } from '../typename.type';
import { Team } from './team.model';
import { User } from './user.model';
import { Entity } from './_entity.model';

export class TeamUser extends Entity<TeamUser> {
	__typename?: Typename = 'TeamUser';
	teamId?: string;
	userId?: string;
	team?: Team;
	user?: User;
	role?: 'TEAMOWNER' | 'TEAMMEMBER' | 'TEAMVIEWER';
	_version?: number;
	_deleted?: boolean;
	_lastChangedAt?: number;
}

// TODO mission audits
