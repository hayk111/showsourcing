import { EntityWithAudit } from '~models/_entity.model';

export class AppImage extends EntityWithAudit<undefined> {
	fileName: string;
	orientation = 0;
	imageType = 'Photo';
	deleted = false;
	constructor() {
		super();
		this.fileName = `${this.id}.jpg`;
	}
}


