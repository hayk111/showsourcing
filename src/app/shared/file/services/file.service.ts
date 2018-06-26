import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { mergeMap, tap, filter, first, switchMap, map } from 'rxjs/operators';
import { ImageUploadService } from '~global-services';
import { AppFile, AppImage, ImageUploadRequest } from '~models';
import { log, LogColor } from '~utils';
import { GlobalService } from '~global-services/_global/global.service';


@Injectable({ providedIn: 'root' })
export class FileService {
	constructor(
		private imageUploadSrv: ImageUploadService,
		private http: HttpClient
	) { }

	uploadImages(imgs: File[]): Observable<any> {
		return forkJoin(imgs.map(img => this.uploadFile(img, 'image'))).pipe(first());
	}

	uploadFiles(files: File[]): Observable<any> {
		return forkJoin(files.map(file => this.uploadFile(file, 'file'))).pipe(first());
	}

	uploadFile(file: File, type: 'file' | 'image' = 'file'): Observable<AppImage> {
		const isImage = type === 'image';
		const request = isImage ? new ImageUploadRequest() : new FileUploadRequest();
		const service: GlobalService<any> = isImage ? this.imageUploadSrv : this.fileUploadSrv;
		const returned = isImage ? request.image : request.file;

		return this.service.create(request).pipe(
			// subscribing to that upload request so we can wait till it's ready
			mergeMap(_ => service.selectOne(request.id)),
			filter(imgRequest => imgRequest.status === 'upload-ready'),
			// when ready we make the upload
			mergeMap(info => this.uploadFileToAws(info, file)),
			// when the upload is done we tell realm that it's the case
			switchMap(_ => service.update({ id: request.id, status: 'uploaded' })),
			first(),
			// sending the image back
			map(_ => returned)
		);
	}

	download(url: string) {
		window.open(url);
	}

	private uploadFileToAws(awsInfo, file: any): Observable<AppImage> {
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
		const contentType;
		debugger;
		// formData.append('Content-Type', );
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
