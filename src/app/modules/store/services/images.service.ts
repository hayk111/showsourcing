import { FileService } from './file.service';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppImage } from '../model/app-image.model';
import { tap } from 'rxjs/operators';



@Injectable()
export class ImageService extends FileService {

	constructor(protected http: HttpClient, protected store: Store<any>) {
		super(http, store);
	}

	download(img: AppImage) {
		window.open(img.urls.url_1000x1000);
	}

	delete(img: AppImage) {
		return this.http.delete(`api/image/${img.id}`);
	}

	rotate(img: AppImage) {
		// we also need to add the client side rotation because if the client clicks twice on rotation that needs to be added up
		const orientation = ( img.orientation + 1 ) % 4 + (img.rotation || 0 );
		return this.http.patch(`api/image/${img.id}`, { orientation }).pipe(
			tap((r: AppImage) => r.target = img.target)
		);
	}

	preload(img: AppImage): Promise<AppImage> {
		return new Promise((resolve, reject) => {
			const image = new Image();
			image.onload = () => resolve(img);
			image.onerror = () => reject(img);
			image.src = img.urls.url_1000x1000;
		});
	}
}
