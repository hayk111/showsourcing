import { uuid } from '~utils';
import { AppImage } from '~models/app-image.model';


export class ImageUploadRequest {
	id ?= uuid();
	status ?= 'request';
	image?: any;
	__typename ?= 'ImageUploadRequest';

	constructor() {
		this.image = new AppImage();
		delete this.image.pending;
	}
}
