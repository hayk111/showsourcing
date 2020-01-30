import { EntityWithAudit } from '~core/ORM/models/_entity.model';
import { ID } from '~utils';

import { ImageUrl } from './image-url.model';

export class AppImage extends EntityWithAudit<AppImageConfig> {
	fileName: string;
	orientation = 0;
	imageType = 'Photo';
	deleted = false;
	pending?: boolean;
	urls?: ImageUrl[];
	__typename ?= 'Image';

	constructor(config?: AppImageConfig) {
		super(config);
		this.fileName = `${this.id}.jpg`;
	}
}

export interface AppImageConfig {
	id?: ID;
	fileName?: string;
	orientation?: number;
	imageType?: string;
	pending?: boolean;
	urls?: ImageUrl[];
}


// MOCK
const urls = ['xs', 's', 'm', 'l', 'xl'].map(size => ({
	url: `https://files.showsourcing.com/${size}/84815f96-27d8-42c7-9f4f-1d8df5a9558d.jpg`,
	__typename: 'ImageUrl',
	id: '',
	maxHeight: 1,
	maxWidth: 1
}));

export const imageMock: AppImage = {
	fileName: 'test.jpg',
	urls,
	__typename: 'Image',
	orientation: 0,
	deleted: false,
	imageType: 'Photo'
} as any;
