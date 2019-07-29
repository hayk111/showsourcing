import { ID } from '~utils/id.utils';
import { Entity } from './_entity.model';

export class ImageUrl implements Entity {
	id?: ID;
	maxWidth?: number;
	maxHeight?: number;
	url: string;
	__typename ?= 'ImageUrl';
}
