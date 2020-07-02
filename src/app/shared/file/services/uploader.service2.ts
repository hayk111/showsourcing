import { Injectable } from '@angular/core';
import { forkJoin, from, Observable } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { api, authStatus, Storage } from 'showsourcing-api-lib';
import { ToastService, ToastType } from '~shared/toast';

@Injectable({ providedIn: 'root' })
export class UploaderService2 {

	constructor(
		private toastSrv: ToastService
	) {}

	uploadFiles(files: File[], nodeId: string): Observable<any> {

		const obs = files.map(file => this.s3upload(file).pipe(
			switchMap(_ => api.Attachment.create(
					[
						{
							fileName: `${authStatus.cognitoId}/${file.name}`,
							nodeId
						}
					]
				)
			),
		));

		return forkJoin(obs).pipe(
			tap(_ => this.showToast(`Uploaded ${files.length} file(s)`)),
			// we start with a local version for immediate display
			startWith({
				pending: true,
				files: files.map(file => ({ fileName: file.name, pending: true }))
			})
		);
	}

	uploadImages(files: File[], nodeId): Observable<any> {
		const cognitoId = authStatus.cognitoId;
		const obs = files.map(file => this.s3upload(file).pipe(
			tap(_ => this.showToast(`Uploaded ${files.length} images(s)`)),
			switchMap(_ => api['Image'].create([{
				fileName: `${cognitoId}/${file.name}`,
				nodeId
			}])),
		));
		return forkJoin(obs).pipe(
			// we start with a local version for immediate display
			startWith({
				pending: true,
				files: files.map(file => ({ pending: true, data$: this.imgToBase64(file) }))
			})
		);
	}

	private s3upload(file: File): Observable<string> {
		return from(Storage.put(
			file.name,
			file
		)) as Observable<string>;
	}

	private async imgToBase64(file: File) {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				resolve((e.target as any).result);
			};
			reader.readAsDataURL(file);
		});
	}

	private showToast(message: string) {
		this.toastSrv.add({
			type: ToastType.SUCCESS,
			title: 'upload successful',
			message
		});
	}

}
