import { Injectable } from '@angular/core';
import { GlobalService } from '~global-services/_global/global.service';
import { ImageUploadRequest } from '~models';
import { GqlClient } from '~shared/apollo';
import { ImageUploadRequestQueries } from '~global-services/image-upload-request/image-upload-request.queries';


@Injectable({ providedIn: 'root' })
export class ImageUploadRequestService extends GlobalService<ImageUploadRequest> {

	constructor(protected gqlClient: GqlClient) {
		super(gqlClient, new ImageUploadRequestQueries());
	}
}
