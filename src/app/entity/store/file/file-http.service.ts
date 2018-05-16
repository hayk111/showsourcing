import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { EntityTarget } from '~app/entity';
import { Log } from '~utils';

import { AppImage } from '../image';
import { selectUser } from '../user';
import { AppFile } from './file.model';

@Injectable()
export class FileHttpService {
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

		return this.upload(data, type, file);
	}

	private upload(data, type, file: AppFile | AppImage) {
		// first we get info regarding the AWS bucket
		return this.getAWSInfo(data, type).pipe(
			// once info are loaded then we can upload said file
			switchMap(tokenInfo => this.uploadFileToAws(tokenInfo, file, type))
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
	private uploadFileToAws(awsInfo: any, file, type: string): Observable<AppFile | AppImage> {
		Log.debug('upload to aws');
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

	linkToItem(target: EntityTarget, file: AppFile, type: string = 'attachment') {
		const name = target.entityRepr.urlName;
		const itemId = target.entityId;
		let data;

		if (type === 'attachment')
			data = { attachmentId: file.id, itemId };
		else
			data = { imageId: file.id, itemId, mainImage: false };

		return this.http.post(`api/${name}/${itemId}/${type}`, data).pipe(map(_ => file));
	}

	delete(ids: Array<string>, target: EntityTarget, type: 'attachment' | 'image' = 'attachment') {
		const targetName = target.entityRepr.urlName;
		const targetId = target.entityId;
		// remove files emitting when all deleted
		return combineLatest(ids.map(id => this.http.delete(`api/${targetName}/${targetId}/${type}/${id}`)));
	}

	download(img: AppFile) {
		window.open(img.url);
	}
}
