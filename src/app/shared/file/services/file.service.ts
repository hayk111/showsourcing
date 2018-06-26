import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { mergeMap, tap, filter, first, switchMap, map } from 'rxjs/operators';
import { ImageUploadService } from '~global-services';
import { AppFile, AppImage, ImageUploadRequest } from '~models';
import { log, LogColor } from '~utils';


@Injectable({ providedIn: 'root' })
export class FileService {
	constructor(
		private imageUploadSrv: ImageUploadService,
		private http: HttpClient
	) { }

	uploadImages(imgs: File[]): Observable<any> {
		return forkJoin(imgs.map(img => this.uploadImage(img))).pipe(first());
	}

	uploadImage(img: File): Observable<AppImage> {
		const request = new ImageUploadRequest();
		return this.imageUploadSrv.create(request).pipe(
			// subscribing to that upload request so we can wait till it's ready
			mergeMap(_ => this.imageUploadSrv.selectOne(request.id)),
			filter(imgRequest => imgRequest.status === 'upload-ready'),
			// when ready we make the upload
			mergeMap(info => this.uploadImageToAws(info, img)),
			// when the upload is done we tell realm that it's the case
			switchMap(_ => this.imageUploadSrv.update({ id: request.id, status: 'uploaded' })),
			first(),
			// sending the image back
			map(_ => request.image)
		);
	}

	// uploadFiles(files: Array<AppFile>, type: 'image' | 'attachment' = 'attachment') {
	// 	return combineLatest(
	// 		files.map((file: AppFile) =>
	// 			// resolving to a swap so we can replace easily
	// 			this.uploadFile(file)
	// 		)
	// 	);
	// }

	// uploads a file and returns an observable of the response which is the saved file
	// uploadFile(
	// 	file: AppFile,
	// 	type: 'image' | 'attachment' = 'attachment'
	// ): Observable<any> {
	// 	let data;
	// 	const fileName = file.fileName;

	// 	if (type === 'attachment')
	// 		data = { fileName, id: file.id };
	// 	else
	// 		data = { imageType: 'Photo', id: file.id };

	// 	return this.upload(data, type, file).pipe(
	// 		tap(_ => this.notificationSrv.add({
	// 			type: NotificationType.SUCCESS,
	// 			title: 'File Uploaded',
	// 			message: 'Your file was uploaded with success',
	// 		}))
	// 	);
	// }

	download(url: string) {
		window.open(url);
	}

	private uploadImageToAws(awsInfo, file: any): Observable<AppImage> {
		log.group('%c uploading to aws', LogColor.SERVICES);
		log.debug(`%c upload url ${awsInfo.uploadUrl}`, LogColor.SERVICES);
		log.group('%c form data', LogColor.SERVICES);
		log.table(JSON.parse(awsInfo.formData));
		log.groupEnd();
		log.groupEnd();

		const formData = this.converFormData(file, JSON.parse(awsInfo.formData));
		const req = new HttpRequest('POST', awsInfo.url, formData, {
			reportProgress: true,
		});
		return this.http.post<any>('https://' + awsInfo.uploadUrl, formData);
	}

	// we receive an array but formData wants an object
	private converFormData(file: any, formDataObj: any) {
		const formData = new FormData();
		formData.append('Content-Type', 'image/jpg');
		delete formDataObj.__typename;
		Object.entries(formDataObj).forEach(([k, v]: any) => formData.append(k, v));
		formData.append('file', file);
		return formData;
	}

	private isFileProgress(event: HttpEvent<any>, appFile: AppFile) {
		switch (event.type) {
			case HttpEventType.UploadProgress:
				// do smtg with progress events
				return false;
			case HttpEventType.Response:
				return true;
		}
	}

	private queryImage(r: AppImage) {
		return this.http.get(r.fileName, { responseType: 'blob' });
	}
}
