import { Lang, ImageType } from '../../../API.service';
import { Entity } from './_entity.model';
import { User } from './user.model';
import { Team } from './team.model';

export class Image extends Entity<Image> {
	__typename ?= 'Image';
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
