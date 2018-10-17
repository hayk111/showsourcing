import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { delay, first, map, mergeMap, retryWhen, take, tap } from 'rxjs/operators';
import { ProductFeatureService } from '~features/products/services';
import { SupplierFeatureService } from '~features/supplier/services/supplier-feature.service';
import { ImageUploadRequestService } from '~global-services';
import { GlobalService } from '~global-services/_global/global.service';
import { FileUploadRequestService } from '~global-services/file-upload-request/file-upload-request.service';
import { AppImage, Attachment, ImageUploadRequest } from '~models';
import { FileUploadRequest } from '~models/file-upload-request.model';
import { NotificationService, NotificationType } from '~shared/notifications';
import { resizeSizeToLimit } from '~shared/utils/file.util';
import { ImageUrls, log, LogColor } from '~utils';

@Injectable({ providedIn: 'root' })
export class UploaderService {

	constructor(
		private imageUploadRequestSrv: ImageUploadRequestService,
		private fileUploadRequestSrv: FileUploadRequestService,
		private productSrv: ProductFeatureService,
		private supplierSrv: SupplierFeatureService,
		private notifSrv: NotificationService,
		private http: HttpClient
	) { }

	uploadImages(imgs: File[], linkedItem?: any): Observable<any> {
		// MaxSize 1200px
		const uploads$ = imgs.map(img =>
			resizeSizeToLimit(img, 1200).pipe(
				first(),
				mergeMap((imgResized: File) => this.uploadFile(imgResized, 'image', linkedItem))
			)
		);
		return forkJoin(uploads$);
	}

	uploadFiles(files: File[], linkedItem?: any): Observable<any> {
		return forkJoin(files.map(file => this.uploadFile(file, 'file', linkedItem))).pipe(
			first());
	}

	uploadImage(file: File, linkedItem?: any) {
		return this.uploadFile(file, 'image', linkedItem);
	}

	uploadFile(
		file: File,
		type: 'file' | 'image' = 'file',
		linkedItem?: any
	): Observable<AppImage> {
		const isImage = type === 'image';
		const fileName = file.name;
		const request = isImage
			? new ImageUploadRequest()
			: new FileUploadRequest(fileName);
		const service: GlobalService<any> = isImage
			? this.imageUploadRequestSrv
			: this.fileUploadRequestSrv;

		const returned = isImage
			? (request as ImageUploadRequest).image
			: (request as FileUploadRequest).attachment;

		return service.create(request).pipe(
			// subscribing to that upload request so we can wait till it's ready
			mergeMap(_ =>
				service.waitForOne(`id == '${request.id}' AND status == 'upload-ready'`)
			),
			// when ready we make the upload
			mergeMap(info => this.uploadFileToAws(info, file, isImage)),
			// when the upload is done on amazon, the image will give a 403 for a few seconds
			// so we need to wait for it to be ready.
			mergeMap(_ => this.emitWhenFileReady(request) as any),
			// putting the request status to uploaded
			mergeMap(_ => service.update({ id: request.id, status: 'uploaded' })),
			// link item
			tap(_file => this.linkItem(returned, linkedItem, isImage)),
			// add notification
			tap(_ => {
				return this.notifSrv.add({
					type: NotificationType.SUCCESS,
					title: 'File Uploaded',
					message: 'Your file was uploaded with success'
				});
			}
			),
			// sending the image back
			map(_ => returned),
			first()
		);
	}

	private uploadFileToAws(
		awsInfo,
		file: any,
		isImage: boolean
	): Observable<AppImage> {
		log.group('%c uploading to aws', LogColor.SERVICES);
		log.debug(`%c upload url ${awsInfo.uploadUrl}`, LogColor.SERVICES);
		log.group('%c form data', LogColor.SERVICES);
		log.table(JSON.parse(awsInfo.formData));
		log.groupEnd();
		log.groupEnd();

		const formData = this.converFormData(
			file,
			JSON.parse(awsInfo.formData),
			isImage
		);
		const req = new HttpRequest('POST', awsInfo.url, formData, {
			reportProgress: true
		});
		return this.http.post<any>('https://' + awsInfo.uploadUrl, formData);
	}

	// we receive an array but formData wants an object
	private converFormData(file: any, formDataObj: any, isImage: boolean) {
		const formData = new FormData();

		if (isImage) formData.append('Content-Type', file.type);

		delete formDataObj.__typename;
		Object.entries(formDataObj).forEach(([k, v]: any) => formData.append(k, v));
		formData.append('file', file);
		return formData;
	}

	private isFileProgress(event: HttpEvent<any>, appFile: Attachment) {
		switch (event.type) {
			case HttpEventType.UploadProgress:
				// do smtg with progress events
				return false;
			case HttpEventType.Response:
				return true;
		}
	}

	/** checks when an image is ready */
	private emitWhenFileReady(request: ImageUploadRequest | FileUploadRequest) {
		if (request instanceof ImageUploadRequest) {
			// query image, when error retries every 1s
			return this.queryImage(request).pipe(
				retryWhen(errors =>
					errors.pipe(
						delay(1000),
						take(20)
					)
				)
			);
		} else {
			// files are ready instantly
			return of([]);
		}
	}

	private queryImage(r: ImageUploadRequest) {
		// xl image is the last that is ready
		return this.http
			.get(ImageUrls.xl + '/' + r.image.fileName, { responseType: 'blob' })
			.pipe(first());
	}

	/** Link uploaded file to its entity */
	private linkItem(returned, linkedItem: any, isImage: boolean) {
		let srv: GlobalService<any>;
		if (linkedItem.__typename === 'Supplier') {
			srv = this.supplierSrv;
		} else if (linkedItem.__typename === 'Product') {
			srv = this.productSrv;
		}

		if (isImage) {
			srv.update({
				id: linkedItem.id,
				images: [...linkedItem.images, returned]
			})
				.subscribe();
		} else {
			const attachments = [...linkedItem.attachments, returned];
			srv.update({ id: linkedItem.id, attachments }).subscribe();
		}
	}
}
