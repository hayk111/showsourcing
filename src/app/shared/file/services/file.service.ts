import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { AppFile, AppImage } from '~models';
import { switchMap, tap, map, retryWhen, take, delay } from 'rxjs/operators';
import { HttpEvent, HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { log } from '~utils';
import { NotificationService, NotificationType } from '~shared/notifications';


@Injectable()
export class FileService {
	constructor(private http: HttpClient, private notificationSrv: NotificationService) { }

	uploadImage(img: AppImage): Observable<AppImage> {
		return this.uploadFile(img, 'image').pipe(
			// so we are sure the file is actually ready, it might not always be the case.
			// the weird // r => resp is so we don't get the response from the query but the resp above it
			switchMap((resp: AppImage) =>
				this.queryImage(resp)
					.pipe(
						map(r => resp),
						retryWhen(errors => errors.pipe(delay(500), take(10))),
				)
			)
		);
	}

	uploadFiles(files: Array<AppFile>, type: 'image' | 'attachment' = 'attachment') {
		return combineLatest(
			files.map((file: AppFile) =>
				// resolving to a swap so we can replace easily
				this.uploadFile(file)
			)
		);
	}

	// uploads a file and returns an observable of the response which is the saved file
	uploadFile(
		file: AppFile,
		type: 'image' | 'attachment' = 'attachment'
	): Observable<any> {
		let data;
		const fileName = file.fileName;

		if (type === 'attachment')
			data = { fileName, id: file.id };
		else
			data = { imageType: 'Photo', id: file.id };

		return this.upload(data, type, file).pipe(
			tap(_ => this.notificationSrv.add({
				type: NotificationType.SUCCESS,
				title: 'File Uploaded',
				message: 'Your file was uploaded with success',
			}))
		);
	}

	download(url: string) {
		window.open(url);
	}

	private upload(data, type, file: AppFile | AppImage) {
		// first we get info regarding the AWS bucket
		return this.getAWSInfo(data, type).pipe(
			// once info are loaded then we can upload said file
			switchMap(tokenInfo => this.uploadFileToAws(tokenInfo, file, type))
		);
	}

	private getAWSInfo(data, type) {
		log.debug('getting AWS infos');
		return this.http.post(`api/${type}`, data);
	}

	// this function is kinda funky
	// first we upload the file to aws,
	// then we delete the token,
	// then we link the img with its entity on the backend
	private uploadFileToAws(awsInfo: any, file, type: string): Observable<AppFile | AppImage> {
		log.debug('upload to aws');
		const formData = this.converFormData(file.file, awsInfo.formData);
		const req = new HttpRequest('POST', awsInfo.url, formData, {
			reportProgress: true,
		});
		return this.http.post(awsInfo.url, formData, {
			reportProgress: true,
			observe: 'response'
		}).pipe(
			// we filter progress events which are used to send progress reports to the store
			// filter((event: HttpResponse<any>) => this.isFileProgress(event, file)),
			switchMap(_ => this.deleteToken(awsInfo) as any)
		);
	}

	// we receive an array but formData wants an object
	private converFormData(file: any, formDataArr: Array<{ [key: string]: string }>) {
		const formData = new FormData();
		formDataArr.forEach(ent => {
			Object.entries(ent).forEach(([k, v]) => {
				formData.append(k, v);
			});
		});
		formData.append('file', file);
		return formData;
	}

	private isFileProgress(event: HttpEvent<any>, appFile: AppFile) {
		switch (event.type) {
			// case HttpEventType.UploadProgress:
			// 	// let progress = Math.round(100 * event.loaded / appFile.file.size);
			// 	// if (progress > 100) progress = 100;
			// 	// this.store.dispatch(FileActions.reportProgress(appFile, progress));
			// 	return false;
			case HttpEventType.Response:
				return true;
		}
	}

	private deleteToken(info) {
		return this.http.delete(`api/token/${info.token}`);
	}

	private queryImage(r: AppImage) {
		return this.http.get(r.fileName, { responseType: 'blob' });
	}
}
