import { EntityWithAudit } from '~models/_entity.model';

export class AppImage extends EntityWithAudit<undefined> {
	fileName: string;
	orientation = 0;
	imageType = 'Photo';
  deleted = false;
  pending = false;
	__typename ?= 'Image';

	constructor() {
		super();
		this.fileName = `${this.id}.jpg`;
	}
}


