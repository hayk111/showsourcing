import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

// service that takes everything that's common to all uploads
@Injectable()
export class FileUploader2 {
	type: string;
	imageType = 'Photo';

	constructor(private http: HttpClient) {	}

	upload(file: any) {
		this.getAWSInfo().pipe(
			switchMap(r => this.uploadToAws(r, file))
		);
	}

	private getAWSInfo() {
		return this.http.post(`api/${this.type}`, { imageType: this.imageType });
	}

	private uploadToAws(awsInfo: any, file) {
		const formData = this.converFormData(file, awsInfo.formData);
		return this.http.post(awsInfo.url, formData);
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

}
