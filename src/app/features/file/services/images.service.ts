import { FileService } from './file.service';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppImage } from '../models/app-image.model';
import { EntityTarget } from '~store/utils/entities.utils';



@Injectable()
export class ImageService extends FileService {

	constructor(protected http: HttpClient, protected store: Store<any>) {
		super(http, store);
	}

	load(target: EntityTarget) {
		return super.load(target, 'image');
	}

	uploadFile(p: { file, target }) {
		return super.uploadFile(p, 'image');
	}

	delete(p: { file, target }) {
		return super.delete(p, 'image');
	}

	download(img: AppImage) {
		window.open(img.urls.url_1000x1000);
	}

	queryFile(r: AppImage) {
		return this.http.get(r.urls.url_1000x1000);
	}

	rotate(img: AppImage) {
		// we also need to add the client side rotation because if the client clicks twice on rotation that needs to be added up
		const orientation = ( img.orientation + 1 ) % 4 + (img.rotation || 0 );
		return this.http.patch(`api/image/${img.id}`, { orientation });
	}

	// used so imgs don't take too much time to load
	preload(img: AppImage): Promise<AppImage> {
		return new Promise((resolve, reject) => {
			const image = new Image();
			image.onload = () => resolve(img);
			image.onerror = () => reject(img);
			image.src = img.urls.url_1000x1000;
		});
	}
}
