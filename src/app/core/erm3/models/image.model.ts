import { Typename } from '../typename.type';
import { Team } from './team.model';
import { User } from './user.model';
import { Entity } from './_entity.model';

export class Image extends Entity<Image> {
	__typename?: Typename = 'Image';
	id?: string;
	teamId?: string;
	team?: Team;
	url?: string;
	fileName?: string;
	orientation?: number;
	imageType?: 'JPG' | 'PNG' | 'GIF';
	nodeId?: string;
}
