import { Injectable } from '@angular/core';
import { GlobalService } from '~global-services/_global/global.service';
import { ImageUploadRequest } from '~models';
import { ApolloClient } from '~shared/apollo';
import { ImageUploadQueries } from '~global-services/image-upload-request/image-upload.queries';


@Injectable({ providedIn: 'root' })
export class ImageUploadService extends GlobalService<ImageUploadRequest> {

	constructor(protected apollo: ApolloClient) {
		super(apollo, new ImageUploadQueries());
	}
}
