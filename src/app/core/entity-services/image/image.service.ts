import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { UserService } from '~entity-services';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { ImageQueries } from '~entity-services/image/image.queries';
import { AppImage } from '~models';
import { ImageUrls } from '~utils';


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

