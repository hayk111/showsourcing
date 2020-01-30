import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { UserService } from '~core/ORM/services';
import { GlobalWithAuditService } from '~core/ORM/services/_global/global-with-audit.service';
import { ImageQueries } from '~core/ORM/services/image/image.queries';
import { AppImage } from '~core/ORM/models';
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

