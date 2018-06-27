import { BaseEntity } from './_entity.model';

export class AppImage extends BaseEntity<undefined> {
	fileName: string;
	orientation = 0;
	imageType = 'Photo';
	deleted = false;
	constructor() {
		super();
		this.fileName = `${this.id}.jpg`;
	}
}


