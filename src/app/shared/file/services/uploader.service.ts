import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { filter, first, map, mergeMap, switchMap } from 'rxjs/operators';
import { ImageUploadRequestService } from '~global-services';
import { GlobalService } from '~global-services/_global/global.service';
import { FileUploadRequestService } from '~global-services/file-upload-request/file-upload-request.service';
import { AppFile, AppImage, ImageUploadRequest } from '~models';
import { FileUploadRequest } from '~models/file-upload-request.model';
import { log, LogColor } from '~utils';


@Injectable({ providedIn: 'root' })
export class UploaderService {
	constructor(
		private imageUploadRequestSrv: ImageUploadRequestService,
		private fileUploadRequestSrv: FileUploadRequestService,
		private http: HttpClient
	) { }

	uploadImages(imgs: File[]): Observable<any> {
		return forkJoin(imgs.map(img => this.uploadFile(img, 'image'))).pipe(first());
	}

	uploadFiles(files: File[]): Observable<any> {
		return forkJoin(files.map(file => this.uploadFile(file, 'file'))).pipe(first());
	}

	uploadFile(file: File, type: 'file' | 'image' = 'file'): Observable<AppImage> {
		// const extension = file.filename.split('.').pop();
		const isImage = type === 'image';
		const ext = file.type.split('/').pop();
		const request = isImage ? new ImageUploadRequest() : new FileUploadRequest(ext);
		const service: GlobalService<any> = isImage ? this.imageUploadRequestSrv : this.fileUploadRequestSrv;
		const returned = isImage ?
			(request as ImageUploadRequest).image : (request as FileUploadRequest).file;

		return service.create(request).pipe(
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
		formData.append('Content-Type', file.type);
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
