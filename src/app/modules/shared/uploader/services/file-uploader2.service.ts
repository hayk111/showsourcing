import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { EntityRepresentation } from '../../../store/model/filter.model';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { uuid } from '../../../store/utils/uuid.utils';
import { Subject } from 'rxjs/Subject';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { AppFile } from '../../../store/model/app-file.model';

// service that takes everything that's common to all uploads
@Injectable()
export class FileUploader2 {

	constructor(private http: HttpClient) {	}

	static imgToBase64(file: File): Observable<any> {
		const returnedObs = new Subject();
		const reader = new FileReader();
		reader.onloadend = function (e) {
			returnedObs.next(reader.result);
		};
		reader.readAsDataURL(file);
		return returnedObs;
	}

	getPendingFile(fileAndId: { file: File, entityId: string}): AppFile {
		const pendingUuid = uuid();
		const pending = true;
		const name = fileAndId.file.name;
		const entityId = fileAndId.entityId;
		const appFile: AppFile = { pendingUuid, pending, name, entityId };
		return appFile;
	}

	upload(file: any) {
		// this.getAWSInfo().pipe(
		// 	switchMap(r => this.uploadToAws(r, file))
		// );
	}


	uploadFile(file: File): Observable<HttpEvent<any>> {
		const fileName = file.name;
		debugger;
		return this.getAWSInfo('attachment', { fileName }).pipe(
			switchMap(
				info => this.uploadFileToAws(info, file)
			)
		);
	}

	uploadImage(file: any, itemId: string, entityRepr: EntityRepresentation) {
		return this.getAWSInfo('image', { imageType: 'Photo' }).pipe(
			switchMap(
				info => this.uploadFileToAws(info, file),
			)
		);
	}

	private getAWSInfo(type, data) {
		return this.http.post(`api/${type}`, data);
	}

	private uploadFileToAws(awsInfo: any, file): Observable<HttpEvent<any>> {
		const formData = this.converFormData(file, awsInfo.formData);
		const req = new HttpRequest('POST', awsInfo.url, formData, { reportProgress: true });
		return this.http.request(req);
	}

	// we receive an array but formData wants an object
	private converFormData(file: any, formDataArr: Array<{[key: string]: string}>) {
		const formData = new FormData();
		formDataArr.forEach(ent => {
			Object.entries(ent).forEach(([k, v]) => {
				formData.append(k, v);
			});
		});
		formData.append('file', file);
		return formData;
	}

	private deleteToken(info) {
		return this.http.delete(`api/token/${info.token}`);
	}

	private linkToItem(entityRepr: EntityRepresentation, imageId: string, itemId: string, mainImage = false) {
		return this.http.post(`api/${entityRepr.urlName}/${itemId}/image`, { imageId, itemId, mainImage });
	}

}
