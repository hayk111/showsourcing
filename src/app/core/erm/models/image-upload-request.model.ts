import { uuid } from '~utils/uuid.utils';
import { AppImage, AppImageConfig } from '~core/erm/models/app-image.model';


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
