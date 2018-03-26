import { FileService } from './file-http.service';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppImage } from '../models/app-image.model';
import { EntityTarget } from '~entity';
import { AppFile } from '~app/features/file';
import { switchMap, retry, delay, retryWhen, take } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ImageHttpService extends FileService {
	constructor(protected http: HttpClient, protected store: Store<any>) {
		super(http, store);
	}

	load(target: EntityTarget) {
		return super.load(target, 'image');
	}

	uploadFile(file: AppFile, target: EntityTarget): Observable<AppFile | AppImage> {
		return super.uploadFile(file, target, 'image').pipe(
			// so we are sure the file is actually ready, it might not always be the case (ask antoine).
			// the weird // resp => resp is so we don't get the response from the
			switchMap((resp: AppImage) =>
				this.queryFile(resp)
					.pipe(retryWhen(errors => errors.pipe(delay(2000), take(10))))
					.map(r => resp)
			)
		);
	}

	delete(p: { ids; target }) {
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
		const orientation = (img.orientation + 1) % 4 + (img.rotation || 0);
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
