import { Injectable } from '@angular/core';
import { AppImage } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { GlobalService } from '~global-services/_global/global.service';
import { ImageQueries } from '~global-services/image/image.queries';
import { Observable } from 'rxjs';
import { ImageUrls } from '~utils';


@Injectable({
	providedIn: 'root'
})
export class ImageService extends GlobalService<AppImage> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new ImageQueries(), 'Image');
	}

	selectMany(...args) {
		return super.selectMany(...args);
	}

	selectAll(fields = 'id'): Observable<any> {
		throw Error(`Don't select all images, you goof !`);
	}

	download(img: AppImage) {
		if (window)
			window.open(ImageUrls.xl + '/' + img.fileName);
	}
}

