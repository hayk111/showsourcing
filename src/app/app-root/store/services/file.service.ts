import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter, switchMap } from 'rxjs/operators';
import { EntityTarget } from '~store/utils/entities.utils';
import { selectUser } from '~user/store/selectors/user.selector';
import { Log } from '~utils';

import { AppFile } from '../model/entities/app-file.model';
import { AppImage } from '../model/entities/app-image.model';

@Injectable()
export class FileService {
	userId: string;

	constructor(protected http: HttpClient, protected store: Store<any>) {
		// if we come so far the user is for sure defined.
		this.store.select(selectUser).subscribe(user => (this.userId = user.id));
	}

	load(target: EntityTarget, type: 'image' | 'attachment' = 'attachment') {
		const obs = [];
		const name = target.entityRepr.urlName;
		const id = target.entityId;
		return this.http.get(`api/${name}/${id}/${type}`);
	}

	uploadFile(
		{ file, target }: { file: AppFile; target: EntityTarget },
		type: 'image' | 'attachment' = 'attachment'
	): Observable<any> {
		let data;
		const fileName = file.fileName;
		if (type === 'attachment') data = { fileName };
		else data = { imageType: 'Photo' };
		return this.upload(data, type, file, target);
	}

	private upload(data, type, file: AppFile, target: EntityTarget) {
		return this.getAWSInfo(data, type).pipe(
			switchMap(tokenInfo => this.uploadFileToAws(tokenInfo, file, type, target))
		);
	}

	private getAWSInfo(data, type) {
		Log.debug('getting AWS infos');
		return this.http.post(`api/${type}`, data);
	}

	// this function is kinda funky
	// first we upload the file to aws,
	// then we delete the token,
	// then we link the img with its entity on the backend
	private uploadFileToAws(awsInfo: any, file, type: string, target): Observable<any> {
		Log.debug('upload to aws');
		const formData = this.converFormData(file.file, awsInfo.formData);
		const req = new HttpRequest('POST', awsInfo.url, formData, { reportProgress: true });
		return this.http.request(req).pipe(
			// we filter progress events which are used to send progress reports to the store
			filter((event: HttpResponse<any>) => this.isFileProgress(event, file)),
			switchMap(_ => this.deleteToken(awsInfo)),
			switchMap((imgInfo: any) => this.linkToItem(target, imgInfo.id, type).map(x => imgInfo))
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

	private linkToItem(target: EntityTarget, attachmentId: string, type: string) {
		const name = target.entityRepr.urlName;
		const itemId = target.entityId;
		let data;

		if (type === 'attachment') data = { attachmentId, itemId };
		else data = { imageId: attachmentId, itemId, mainImage: false };

		return this.http.post(`api/${name}/${itemId}/${type}`, data);
	}

	delete(
		{ file, target }: { file: AppFile | AppImage; target: EntityTarget },
		type: 'attachment' | 'image' = 'attachment'
	) {
		const targetName = target.entityRepr.urlName;
		const targetId = target.entityId;
		return this.http.delete(`api/${targetName}/${targetId}/${type}/${file.id}`);
	}

	download(img: AppFile) {
		window.open(img.url);
	}
}
