import { Injectable, Optional, Inject } from '@angular/core';
import { FileUploader, FileUploaderOptions, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import Log from '../../../../utils/logger/log.class';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs/operators';


const BASE_OPTS: FileUploaderOptions = {
	autoUpload: false,
	// method: 'PUT',
	disableMultipart: true,
	formatDataFunction: (item: FileItem) => item.formData
};

interface FileItemWithToken extends FileItem {
	token: string;
	id: number;
	info: any;
}

// service that takes everything that's common to all uploads
@Injectable()
export class FileUploaderService extends FileUploader {
	private static fileID = 0;
	uploader: FileUploader;
	// entityID so we can link the img to a specific item
	entityID: string;
	private _type = 'image';
	private _imageType = 'Photo';
	private reader = new FileReader();

	constructor(@Inject('uploaderOptions') @Optional()
							options: FileUploaderOptions,
							private http: HttpClient) {
		super(options || BASE_OPTS);
		Log.debug('FileUploaderService created');
	}

	set imageType(imgType: string) {
		this.imageType = imgType;
	}

	set type(type: string) {
		this.type = type;
	}

	protected _onAfterAddingFile(fileItem: FileItemWithToken) {
		// 1. ask info to 'api/xx', add those info to fileItem
		// 2. Upload said file.
		fileItem.id = FileUploaderService.fileID++;
		super._onAfterAddingFile(fileItem);
		this.http.post(`api/${this._type}`, {imageType: this._imageType})
		.subscribe((r: any) => {
			fileItem.url = r.url;
			fileItem.withCredentials = false;
			fileItem.token = r.token;
			fileItem.formData = this.converFormData(fileItem, r.formData);
			this.uploadItem(fileItem);
		});
	}

	// we receive an array but formData wants an object
	private converFormData(fileItem: FileItemWithToken, formDataArr: Array<{[key: string]: string}>) {
		const formData = new FormData();
		formDataArr.forEach(ent => {
			Object.entries(ent).forEach(([k, v]) => {
				formData.append(k, v);
			});
		});
		formData.append('file', fileItem._file);
		return formData;
	}

	protected _onSuccessItem(item: FileItemWithToken, response: string, status: number, headers: ParsedResponseHeaders) {
		// delete token
		this.http.delete(`api/token/${item.token}`).subscribe( x => {
			item.info = x;
			super._onSuccessItem(item, response, status, headers);
		});
	}

	public _onErrorItem(item: FileItemWithToken, response: string, status: number, headers: ParsedResponseHeaders) {
		super._onErrorItem(item, response, status, headers);
	}

	formDataFunction(item: FileItem) {

	}

}
