import { Injectable } from '@angular/core';
import { forkJoin, from, Observable } from 'rxjs';
import { switchMap, tap, concatMap } from 'rxjs/operators';
import { api, authStatus, Image, Storage, Auth } from 'showsourcing-api-lib';
import { ToastService, ToastType } from '~shared/toast';
import { UserService } from '~core/auth';
import { ObservableFileUpload, ObservableImageUpload } from '../interfaces/observable-upload.interface';
import { uuid } from '~utils';

@Injectable({ providedIn: 'root' })
export class UploaderService {

	private uploadingImgName: string;

	constructor(
		private toastSrv: ToastService,
		private userSrv: UserService
	) {}

	uploadFiles(files: File[], nodeId: string): ObservableFileUpload {
		const cognitoId = authStatus.cognitoId;
		const obsArray = files.map(file => this.s3upload(file).pipe(
			switchMap(_ => api.Attachment.create([{
				fileName: `${cognitoId}/${file.name}`,
				nodeId
			}])),
		));
		const obsResponses = forkJoin(obsArray).pipe(
			tap(_ => this.showToast(`Uploaded ${files.length} file(s)`))
		) as ObservableFileUpload;

		obsResponses.onTempFiles = (fn) => {
			fn(files.map(file => ({ fileName: file.name, type: 'pending' })));
			return obsResponses;
		};

		return obsResponses;

	}

	uploadImages(files: File[], nodeId): ObservableImageUpload {
		console.log('uploading files======', authStatus.user, files, nodeId);

		console.log('UploaderService -> uploadImages -> this.userSrv.identityId', this.userSrv.identityId);
		const obsArray = files.map(file => this.s3upload(file).pipe(
			tap((imgData) => {
				console.log('UploaderService -> uploadImages -> imgData', imgData);
			}),
			switchMap((img: any) => {
				console.log('UploaderService -> uploadImages -> this.uploadingImgName', this.uploadingImgName);
				return api.Image.create([{
					fileName: `${this.userSrv.identityId}/${this.uploadingImgName}`,
					nodeId
				}]);
			}),
		));

		const obsResponses = forkJoin(obsArray).pipe(
			switchMap(() => Auth.currentUserCredentials()),
			tap(_ => this.showToast(`Uploaded ${files.length} image(s)`))
		) as ObservableImageUpload;		// casting to add the temp function

		obsResponses.onTempImages = (fn) => {
			this.convertToTempImages(files)
			.then(temp => fn(temp));
			return obsResponses;
		};

		return obsResponses;

	}

	private s3upload(file: File): Observable<string> {
		const extension = file.name.slice(file.name.lastIndexOf('.'));
		this.uploadingImgName = uuid() + extension;
		console.log('UploaderService -> file00000', extension, this.uploadingImgName);
		return from(Storage.put(
			this.uploadingImgName,
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

	private showToast(message: string) {
		this.toastSrv.add({
			type: ToastType.SUCCESS,
			title: 'upload successful',
			message
		});
	}

}
