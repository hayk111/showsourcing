import { uuid } from '~utils';
import { AppImage, AppImageConfig } from '~core/orm/models/app-image.model';


export class ImageUploadRequest {
	id ?= uuid();
	status ?= 'request';
	image?: any;
	__typename ?= 'ImageUploadRequest';

	constructor(config: AppImageConfig) {
		this.image = new AppImage(config);
		delete this.image.pending;
	}
}
