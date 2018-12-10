import { EntityWithAudit } from '~models/_entity.model';
import { ImageUrl } from './image-url.model';

export class AppImage extends EntityWithAudit<undefined> {
	fileName: string;
	orientation = 0;
	imageType = 'Photo';
	deleted = false;
	pending?: boolean;
	urls?: ImageUrl[];
	__typename ?= 'Image';

	constructor() {
		super();
		this.fileName = `${this.id}.jpg`;
	}
}
