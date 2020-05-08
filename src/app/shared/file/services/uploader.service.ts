import { Injectable, ChangeDetectorRef } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { forkJoin, from, Observable } from 'rxjs';
import { switchMap, startWith, tap } from 'rxjs/operators';
import { ApiService, Attachment, Image } from '~core/erm3';
import { ToastService, ToastType } from '~shared/toast';
import { AuthenticationService } from '~core/auth';
import { environment } from 'environments/environment';
import { ObservableFileUpload, ObservableImageUpload } from '../interfaces/observable-upload.interface';

@Injectable({ providedIn: 'root' })
export class UploaderService {

	constructor(
		private apiSrv: ApiService,
		private amplifySrv: AmplifyService,
		private authSrv: AuthenticationService,
		private toastSrv: ToastService
	) {}

	uploadFiles(files: File[], nodeId: string): ObservableFileUpload {
		const cognitoId = this.getCognitoId();
		const obsArray = files.map(file => this.s3upload(file).pipe(
			switchMap(_ => this.apiSrv.create<Attachment>('Attachment', {
				fileName: `${cognitoId}/${file.name}`,
				nodeId
			})),
		));
		const obsResponses = forkJoin(obsArray).pipe(
			tap(_ => this.showToast(`Uploaded ${files.length} file(s)`))
		) as ObservableFileUpload;

		obsResponses.onTempFiles = (fn) => {
			fn(files.map(file => ({ fileName: file.name, pending: true })));
			return obsResponses;
		};

		return obsResponses;

	}

	uploadImages(files: File[], nodeId): ObservableImageUpload {
		const cognitoId = this.getCognitoId();

		const obsArray = files.map(file => this.s3upload(file).pipe(
			switchMap(_ => this.apiSrv.create<Image>('Image', {
				fileName: `${cognitoId}/${file.name}`,
				nodeId
			})),
		));

		const obsResponses = forkJoin(obsArray).pipe(
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
		return from(this.amplifySrv.storage().put(
			file.name,
			file
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
		).then(b64s => b64s.map(b64 => ({ url: b64, pending: true })));
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

	private getCognitoId() {
		return this.authSrv.authState.user.pool.storage[
			`aws.cognito.identity-id.${environment.awsConfig.aws_cognito_identity_pool_id}`
		];
	}

}
