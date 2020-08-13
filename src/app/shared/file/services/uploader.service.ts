import { Injectable } from '@angular/core';
import { forkJoin, from, Observable, zip } from 'rxjs';
import { switchMap, tap, concatMap } from 'rxjs/operators';
import { api, authStatus, Image, Storage, Auth } from 'showsourcing-api-lib';
import { ToastService, ToastType } from '~shared/toast';
import { UserService } from '~core/auth';
import { ObservableFileUpload, ObservableImageUpload } from '../interfaces/observable-upload.interface';
import { uuid } from '~utils';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class UploaderService {

	private uploadingImgName: string;

	constructor(
		private toastSrv: ToastService,
		private userSrv: UserService
	) {}

	uploadFiles(files: File[], nodeId: string): ObservableFileUpload {
		const obsArray = files.map(file => this.s3upload(file, true));
		const obsResponses = forkJoin(obsArray).pipe(
			switchMap((files) => {
				const toCreate = [];
				files.forEach((file: any) => {
					toCreate.push({ fileName: `${this.userSrv.identityId}/${file.key}`, nodeId });
				});
				return api.Attachment.create(toCreate).local$;
			}),
		) as ObservableFileUpload;		// casting to add the temp function

		obsResponses.onTempFiles = (fn) => {
			fn(files.map(file => ({ fileName: file.name, type: 'pending' })));
			return obsResponses;
		};

		return obsResponses;

	}

	uploadImages(files: File[], nodeId): ObservableImageUpload {
		const obsArray = files.map(file => this.s3upload(file));

		const obsResponses = forkJoin(obsArray).pipe(
			switchMap((images) => { // images are returned from s3upload function with corresponding names in S3
				const toCreate = [];
				images.forEach((img: any) => {
					console.log('image name::::', this.userSrv.identityId, img.key);
					toCreate.push({ fileName: `${this.userSrv.identityId}/${img.key}`, nodeId });
				});
				return api.Image.create(toCreate).local$;
			}),
			// switchMap(() => Auth.currentUserCredentials()),
		) as ObservableImageUpload;		// casting to add the temp function

		obsResponses.onTempImages = (fn) => {
			this.convertToTempImages(files)
			.then(temp => fn(temp));
			return obsResponses;
		};

		return obsResponses;

	}

	showToast(message: string, title = 'upload successful', type = ToastType.SUCCESS) {
		this.toastSrv.add({
			type,
			title,
			message
		});
	}

	private s3upload(file: File, byName = false): Observable<string> {
		const extension = file.name.slice(file.name.lastIndexOf('.'));
		return from(Storage.put(
			// for file attachments we use file name and replace spaces with dashes
			byName ? _.deburr(file.name).replace(/[^a-z0-9\._]/gi, '-') : uuid() + extension,
			file,
			{
				level: 'private',
			}
		)) as Observable<string>;
	}

	/** given a series of file we convert it locally
	 * to the same model as a database Image, the url however
	 * is the base64 version so we can use it in the [src] attr
	 * it also has the added pending: true property to be recognizable
	 */
	private convertToTempImages(files: File[]): Promise<Image[]> {
		return Promise.all(
			files.map(file => this.imgToBase64(file))
		).then(b64s => b64s.map(b64 => ({ url: b64, type: 'pending' })));
	}

	/** converts an image to its base64 version */
	private async imgToBase64(file: File): Promise<string> {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				resolve((e.target as any).result);
			};
			reader.readAsDataURL(file);
		});
	}

}
