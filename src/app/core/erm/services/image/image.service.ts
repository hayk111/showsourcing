import { Injectable } from '@angular/core';
import { AppImage } from '~core/erm/models';
import { ImageQueries } from '~core/erm/services/image/image.queries';
import { UserService } from '~core/erm/services/user/user.service';
import { GlobalWithAuditService } from '~core/erm/services/_global/global-with-audit.service';
import { ImageUrls } from '~utils';


@Injectable({
	providedIn: 'root'
})
export class ImageService extends GlobalWithAuditService<AppImage> {

	constructor(protected userSrv: UserService) {
		super(ImageQueries, 'image', 'images', userSrv);
	}

	download(img: AppImage) {
		if (window) {
			window.open(`${ImageUrls.xl}/${img.id}.jpg`);
		}
	}
}

