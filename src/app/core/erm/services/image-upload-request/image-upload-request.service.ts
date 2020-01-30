import { Injectable } from '@angular/core';
import { ImageUploadRequest } from '~core/erm/models';
import { ImageUploadRequestQueries } from '~core/erm/services/image-upload-request/image-upload-request.queries';
import { GlobalService } from '~core/erm/services/_global/global.service';


@Injectable({ providedIn: 'root' })
export class ImageUploadRequestService extends GlobalService<ImageUploadRequest> {

	constructor() {
		super(ImageUploadRequestQueries, 'imageUploadRequest', 'imageUploadRequests');
	}
}
