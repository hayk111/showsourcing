import { uuid } from '~utils';
import { AppImage } from '~models/app-image.model';


export class ImageUploadRequest {
	id ?= uuid();
	status ?= 'request';
	image?: any;

	constructor() {
		this.image = new AppImage();
	}

}
