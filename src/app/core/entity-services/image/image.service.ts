import { Injectable } from '@angular/core';
import { AppImage } from '~models';
import { Apollo } from 'apollo-angular';

import { GlobalService } from '~entity-services/_global/global.service';
import { ImageQueries } from '~entity-services/image/image.queries';
import { Observable } from 'rxjs';
import { ImageUrls } from '~utils';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { UserService } from '~entity-services';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class ImageService extends GlobalWithAuditService<AppImage> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, ImageQueries, 'image', 'images', userSrv);
	}

	download(img: AppImage) {
		if (window) {
			window.open(`${ImageUrls.xl}/${img.id}.jpg`);
		}
	}
}

