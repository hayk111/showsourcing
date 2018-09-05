import { Injectable } from '@angular/core';
import { GlobalService } from '~global-services/_global/global.service';
import { ImageUploadRequest } from '~models';
import { Apollo } from 'apollo-angular';
import { ImageUploadRequestQueries } from '~global-services/image-upload-request/image-upload-request.queries';
import { ApolloStateService } from '~shared/apollo';


@Injectable({ providedIn: 'root' })
export class ImageUploadRequestService extends GlobalService<ImageUploadRequest> {

	constructor(protected apollo: Apollo, protected apolloState: ApolloStateService) {
		super(apollo, apolloState, ImageUploadRequestQueries, 'imageUploadRequest', 'imageUploadRequests');
	}
}
