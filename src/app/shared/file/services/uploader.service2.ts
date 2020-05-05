import { ApiService } from '~core/erm3';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, from } from 'rxjs';
import { AmplifyService } from 'aws-amplify-angular';
import { AuthenticationService } from '~core/auth';

@Injectable({ providedIn: 'root' })
export class UploaderService2 {

	constructor(
		private apiSrv: ApiService,
		private authSrv: AuthenticationService,
		private amplifySrv: AmplifyService
	) {}

	uploadFiles(files: File[]): Observable<any> {
		return forkJoin(files.map(file => this.s3upload(file)));
	}

	uploadImages(files: File[]): Observable<any> {
		return forkJoin(files.map(file => this.s3upload(file)));
	}

	private s3upload(file: File) {
		const sub = this.authSrv.authState.user.attributes.sub;
		return from(
			this.amplifySrv.storage().put('uploads/' + file.name, file, {
				level: 'private'
			})
		);
	}

}
