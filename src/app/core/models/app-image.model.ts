import { EntityWithAudit } from '~models/_entity.model';
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
