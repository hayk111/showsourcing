import { Injectable } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { forkJoin, from, Observable } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { ApiService, Attachment, Image } from '~core/erm3';

@Injectable({ providedIn: 'root' })
export class UploaderService2 {

	constructor(
		private apiSrv: ApiService,
		private amplifySrv: AmplifyService
	) {}

	uploadFiles(files: File[], nodeId: string): Observable<any> {
		const obs = files.map(file => this.s3upload(file).pipe(
			switchMap(fileName => this.apiSrv.create<Attachment>('Attachment', {
				fileName,
				nodeId
			})),
		));
		return forkJoin(obs).pipe(
			// we start with a local version for immediate display
			startWith({
				pending: true,
				files: files.map(file => ({ fileName: file.name, pending: true }))
			})
		);
	}

	uploadImages(files: File[], nodeId): Observable<any> {
		const obs = files.map(file => this.s3upload(file).pipe(
			switchMap(fileName => this.apiSrv.create<Image>('Image', {
				fileName,
				nodeId
			})),
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
		return from(this.amplifySrv.storage().put(
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

}
