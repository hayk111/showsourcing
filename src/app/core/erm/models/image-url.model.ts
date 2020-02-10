import { ID } from '~utils/id.utils';

export class ImageUrl {
	id: ID;
	maxWidth: number;
	maxHeight: number;
	url: string;
	__typename ?= 'ImageUrl';
}
