import { Injectable } from '@angular/core';
import { AppImage } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { GlobalService } from '~global-services/_global/global.service';
import { ImageQueries } from '~global-services/image/image.queries';
import { Observable } from 'rxjs';
import { ImageUrls } from '~utils';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { UserService } from '~global-services';


@Injectable({
	providedIn: 'root'
})
export class ImageService extends GlobalWithAuditService<AppImage> {

	constructor(wrapper: ApolloWrapper, protected userSrv: UserService) {
		super(wrapper, new ImageQueries(), 'Image', userSrv);
	}

	selectAll(fields = 'id'): Observable<any> {
		throw Error(`Don't select all images, you goof !`);
	}

	download(img: AppImage) {
		if (window)
			window.open(ImageUrls.xl + '/' + img.fileName);
	}
}

