import { uuid } from '~utils/uuid.utils';
import { AppImage } from '~core/erm/models/app-image.model';


export class ImageUploadRequest {
	id ?= uuid();
	status ?= 'request';
	image?: any;
	__typename ?= 'ImageUploadRequest';

	constructor(config: AppImage) {
		this.image = new AppImage(config);
		delete this.image.pending;
	}
}
