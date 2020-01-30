import { Injectable } from '@angular/core';
import { GlobalService } from '~core/ORM/services/_global/global.service';
import { ImageUploadRequest } from '~core/ORM/models';
import { ImageUploadRequestQueries } from '~core/ORM/services/image-upload-request/image-upload-request.queries';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({ providedIn: 'root' })
export class ImageUploadRequestService extends GlobalService<ImageUploadRequest> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, ImageUploadRequestQueries, 'imageUploadRequest', 'imageUploadRequests');
	}
}
