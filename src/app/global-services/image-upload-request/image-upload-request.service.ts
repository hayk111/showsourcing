import { Injectable } from '@angular/core';
import { GlobalService } from '~global-services/_global/global.service';
import { ImageUploadRequest } from '~models';
import { Apollo } from 'apollo-angular';
import { ImageUploadRequestQueries } from '~global-services/image-upload-request/image-upload-request.queries';


@Injectable({ providedIn: 'root' })
export class ImageUploadRequestService extends GlobalService<ImageUploadRequest> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new ImageUploadRequestQueries());
	}
}
