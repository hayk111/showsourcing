import { TeamInput, ImageType, UserInput } from '../../../API.service';
import { Entity } from './_entity.model';


export class Image extends Entity<Image> {
	__typename ?= 'Image';
	id?: string;
	teamId?: string | null;
	team?: TeamInput | null;
	fileName?: string | null;
	orientation?: number | null;
	imageType?: ImageType | null;
	createdAt?: number | null;
	createdByUserId?: string | null;
	createdBy?: UserInput | null;
	deletedByUserId?: string | null;
	deletedBy?: UserInput | null;
	deletedAt?: number | null;
	lastUpdatedByUserId?: string | null;
	lastUpdatedBy?: UserInput | null;
	lastUpdatedAt?: number | null;
	deleted?: boolean | null;
	_version?: number | null;
}
