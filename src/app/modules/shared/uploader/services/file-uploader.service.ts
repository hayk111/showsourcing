import { Injectable, Optional, Inject } from '@angular/core';
import { FileUploader, FileUploaderOptions, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import Log from '../../../../utils/logger/log.class';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { EntityRepresentation } from '../../../store/model/filter.model';
import { ProductActions } from '../../../store/action/product.action';
import { Store } from '@ngrx/store';


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
	// so we can link the image to its entity when it's been uploaded
	entityRepr: EntityRepresentation;
	entityId: string;
	autoLinkImage = true;
	// the upload data changes when the type changes
	private _type = 'image';
	private _imageType = 'Photo';

	constructor(@Inject('uploaderOptions') @Optional()
							options: FileUploaderOptions,
							private http: HttpClient,
							private store: Store<any>) {
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

	protected _onSuccessItem(fileItem: FileItemWithToken, response: string, status: number, headers: ParsedResponseHeaders) {
		// delete token
		this.http.delete(`api/token/${fileItem.token}`).subscribe( x => {
			if (this.autoLinkImage)
				// TODO: we actually need the correct action here so.. This might not be the right place.
				this.http.post(`api/${this.entityRepr.urlName}/${this.entityId}/${this.type}`,
					{ imageId: fileItem.id, itemId: this.entityId, mainImage: false })
				.subscribe((r: any) => this.store.dispatch(ProductActions.setImageReady(this.entityId, fileItem.id)));
			else
			// we add info so we can link the image whenever we want to
				fileItem.info = x;
			super._onSuccessItem(fileItem, response, status, headers);
		});
	}

	public _onErrorItem(item: FileItemWithToken, response: string, status: number, headers: ParsedResponseHeaders) {
		super._onErrorItem(item, response, status, headers);
	}

	formDataFunction(item: FileItem) {

	}

}
