import { Injectable } from '@angular/core';
import { AppImage } from '~models';
import { ApolloClient } from '~shared/apollo';

import { GlobalService } from '../_global/global.service';
import { ImageQueries } from './image.queries';
import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class ImageService extends GlobalService<AppImage> {

	constructor(protected apollo: ApolloClient) {
		super(apollo, new ImageQueries(), 'Image');
	}

	selectMany(...args) {
		return super.selectMany(...args);
	}

	selectAll(fields = 'id'): Observable<any> {
		throw Error(`Don't select all images, you goof !`);
	}

	download(img: AppImage) {
		if (window)
			window.open('https://files.showsourcing.com/xl/' + img.fileName);
	}
}

