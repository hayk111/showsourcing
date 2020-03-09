import { Typename } from '../typename.type';
import { Team } from './team.model';
import { User } from './user.model';
import { Entity } from './_entity.model';
import { ImageType } from '../API.service';

export class Image extends Entity<Image> {
	__typename?: Typename = 'Image';
	id?: string;
	teamId?: string;
	team?: Team;
	fileName?: string;
	orientation?: number;
	imageType?: ImageType;
	createdAt?: number;
	createdByUserId?: string;
	createdBy?: User;
	deletedByUserId?: string;
	deletedBy?: User;
	deletedAt?: number | null;
	lastUpdatedByUserId?: string;
	lastUpdatedBy?: User;
	lastUpdatedAt?: number;
	deleted?: boolean;
	_version?: number;
	_deleted?: boolean | null;
	_lastChangedAt?: number;
}
