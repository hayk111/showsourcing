import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { EntityRepresentation } from '../../../store/model/filter.model';

// service that takes everything that's common to all uploads
@Injectable()
export class FileUploader2 {

	constructor(private http: HttpClient) {	}

	static imgToBase64(file: any) {
		return new Promise((res: any, rej: any) => {
			const reader = new FileReader();
			reader.onloadend = function (e) {
				res(reader.result);
			};
			reader.readAsDataURL(file.file  );
		});
	}

	upload(file: any) {
		// this.getAWSInfo().pipe(
		// 	switchMap(r => this.uploadToAws(r, file))
		// );
	}

	uploadImage(file: any, productId: string, entityRepr: EntityRepresentation) {
		return this.getAWSInfo('image', { imageType: 'Photo' }).pipe(
			switchMap(
				info => this.uploadImgToAws(info, file),
				(info: any, r) => this.deleteToken(info)
			),
			switchMap((r: any) => this.linkToItem(entityRepr, r.id, productId))
		);
	}

	private getAWSInfo(type, data) {
		return this.http.post(`api/${type}`, data);
	}

	private uploadImgToAws(awsInfo: any, file) {
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

	private deleteToken(info) {
		return this.http.delete(`api/token/${info.token}`);
	}

	private linkToItem(entityRepr: EntityRepresentation, imageId: string, itemId: string, mainImage = false) {
		return this.http.post(`api/${entityRepr.urlName}/${itemId}/image`, { imageId, itemId, mainImage });
	}

}
