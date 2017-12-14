import { EntityTarget } from '../../store/utils/entities.utils';
import { HttpClient, HttpEvent, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { AppFile } from '../../store/model/app-file.model';
import { switchMap, filter, tap } from 'rxjs/operators';
import { uuid } from '../../store/utils/uuid.utils';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/selectors/user.selector';
import { FileActions } from '../../store/action/file.action';



@Injectable()
export class FileService {
	userId: string;

	constructor(private http: HttpClient, private store: Store<any>) {
		// if we come so far the user is for sure defined.
		this.store.select(selectUser).subscribe(user => this.userId = user.id);
	}

	getPendingFile(file: AppFile) {
		const copy = { ...file };
		copy.pending = true;
		copy.id = uuid();
		copy.fileName = file.file.name;
		copy.creationDate = Date.now();
		copy.createdByUserId = this.userId;
		copy.progress = 0;
		return copy;
	}

	load(target: EntityTarget) {
		const obs = [];
		const name = target.entityRepr.urlName;
		const id = target.entityId;
		return this.http.get(`api/${name}/${id}/attachment`)
		.pipe(
			tap((r: Array<AppFile>) => r.forEach(f => f.target = target))
		);
	}

	uploadFile(file: AppFile): Observable<any> {
		const fileName = file.file.name;
		return this.getAWSInfo('attachment', { fileName }).pipe(
			switchMap(tokenInfo => this.uploadFileToAws(tokenInfo, file)),
			// adding target to the file so we know what it's linked to
			tap((returnedFile: AppFile) => returnedFile.target = file.target)
		);
	}

	private getAWSInfo(type, data) {
		return this.http.post(`api/attachment`, data);
	}

	// this function is kinda funky
	// first we upload the file to aws,
	// then we delete the token,
	// then we link the img with its entity on the backend
	private uploadFileToAws(awsInfo: any, file): Observable<any> {
		const formData = this.converFormData(file.file, awsInfo.formData);
		const req = new HttpRequest('POST', awsInfo.url, formData, { reportProgress: true });
		return this.http.request(req).pipe(
			// we filter progress events which are used to send progress reports to the store
			filter((event: HttpResponse<any>) => this.isFileProgress(event, file)),
			switchMap(_ => this.deleteToken(awsInfo)),
			switchMap((imgInfo: any) => this.linkToItem(file.target, imgInfo.id).map(x => imgInfo))
		);
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

	private isFileProgress(event: HttpEvent<any>, appFile: AppFile) {
		switch (event.type) {
			case HttpEventType.UploadProgress:
				let progress = Math.round(100 * event.loaded / appFile.file.size);
				if (progress > 100) progress = 100;
				this.store.dispatch(FileActions.reportProgress(appFile, progress));
				return false;
			case HttpEventType.Response:
				return true;
		}
	}

	private deleteToken(info) {
		return this.http.delete(`api/token/${info.token}`);
	}

	private linkToItem(target: EntityTarget, attachmentId: string, mainImage = false) {
		const name = target.entityRepr.urlName;
		const itemId = target.entityId;
		return this.http.post(`api/${name}/${itemId}/attachment`, { attachmentId, itemId, mainImage });
	}
}
