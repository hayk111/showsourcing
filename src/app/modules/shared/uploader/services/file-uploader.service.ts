import { Injectable, Optional, Inject } from '@angular/core';
import { FileUploader, FileUploaderOptions, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import Log from '../../../../utils/logger/log.class';
import { HttpClient } from '@angular/common/http';


const BASE_OPTS: FileUploaderOptions = {
	autoUpload: false,
	// method: 'PUT',
	disableMultipart: true,
	formatDataFunction: (item: FileItem) => item.formData
};

// service that takes everything that's common to all uploads
@Injectable()
export class FileUploaderService extends FileUploader {
	uploader: FileUploader;
	private _type = 'image';
	private _imageType = 'Photo';

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

	protected _onAfterAddingFile(fileItem: FileItem) {
		// 1. ask info to 'api/xx', add those info to fileItem
		// 2. Upload said file.
		super._onAfterAddingFile(fileItem);
		this.http.post(`api/${this._type}`, {imageType: this._imageType})
		.subscribe((r: any) => {
			fileItem.url = r.url;
			fileItem.withCredentials = false;
			fileItem.formData = this.converFormData(fileItem, r.formData);
			this.uploadItem(fileItem);
		});
	}

	// we receive an array but formData wants an object
	private converFormData(fileItem: FileItem, formDataArr: Array<{[key: string]: string}>) {
		const formData = new FormData();
		// we receive an array but formData wants an object
		formDataArr.forEach(ent => {
			Object.entries(ent).forEach(([k, v]) => {
				formData.append(k, v);
			});
		});
		formData.append('file', fileItem._file);
		return formData;
	}

	protected _onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) {
		// delete token
		// remove from uploading list
		super._onSuccessItem(item, response, status, headers);
	}

	public _onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) {
		super._onErrorItem(item, response, status, headers);
	}

	formDataFunction(item: FileItem) {

	}

}
