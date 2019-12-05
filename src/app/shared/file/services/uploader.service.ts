import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { delay, first, map, mapTo, mergeMap, retryWhen, switchMap, take, tap } from 'rxjs/operators';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ERMService } from '~core/entity-services/_global/erm.service';
import { ImageService } from '~core/entity-services/image/image.service';
import { AttachmentService, ImageUploadRequestService } from '~entity-services';
import { GlobalService } from '~entity-services/_global/global.service';
import {
	AttachmentUploadRequestService,
} from '~entity-services/attachment-upload-request/attachment-upload-request.service';
import { AppImage, Attachment, ImageUploadRequest } from '~models';
import { AttachmentUploadRequest } from '~models/attachment-upload-request.model';
import { NotificationService, NotificationType } from '~shared/notifications';
import { resizeSizeToLimit } from '~shared/utils/file.util';
import { ImageUrls, log, LogColor } from '~utils';

@Injectable({ providedIn: 'root' })
export class UploaderService {

	constructor(
		private imageUploadRequestSrv: ImageUploadRequestService,
		private fileUploadRequestSrv: AttachmentUploadRequestService,
		private imageSrv: ImageService,
		private attachmentSrv: AttachmentService,
		private ermSrv: ERMService,
		private notifSrv: NotificationService,
		private http: HttpClient
	) { }


	uploadImages(imgs: File[], linkedItem?: any, imageProperty = 'images', isPropertyArray = true, client?: Client): Observable<AppImage[]> {
		const uploads$ = imgs.map(img =>
			// MaxSize 1200px
			resizeSizeToLimit(img, 1200).pipe(
				first(),
				tap(imgResized => log.debug(`about to upload image ${imgResized.name}, with size: ${imgResized.size} and type ${imgResized.type}`)),
				mergeMap((imgResized: File) => this.uploadFile(imgResized, 'image', linkedItem, client)),
			)
		);
		return forkJoin(uploads$).pipe(
			// link item (we need to do it after the file is ready else we will have 403)
			mergeMap((files: AppImage[]) => this.linkItem(files, linkedItem, true, imageProperty, isPropertyArray)),
			// we query the files once again, so we have the latest fromt he backend
			mergeMap(images => this.queryFiles(true, images)),
			// add notification
			first(),
			tap((files: AppImage[]) => {
				return this.notifSrv.add({
					type: NotificationType.SUCCESS,
					title: `${files.length} image(s) Uploaded with success`,
					message: 'Your images were uploaded with success'
				});
			}),
		);
	}

	uploadFiles(files: File[], linkedItem?: any, client?: Client): Observable<any> {
		return forkJoin(files.map(file => this.uploadFile(file, 'file', linkedItem, client))).pipe(
			first(),
			// link item (we need to do it after the file is ready else we will have 403)
			mergeMap((attachments: any[]) => this.linkItem(attachments, linkedItem, false)),
			// we query the files once again, so we have the latest fromt he backend
			mergeMap(attachments => this.queryFiles(false, attachments)),
			// add notification
			tap((attachments: Attachment[]) => {
				return this.notifSrv.add({
					type: NotificationType.SUCCESS,
					title: `${files.length} Uploaded with success`,
					message: 'Your files were uploaded with success'
				});
			}),
		);
	}

	uploadImage(file: File, linkedItem?: any, client?: Client) {
		return this.uploadFile(file, 'image', linkedItem, client);
	}

	uploadFile(file: File, type: 'file' | 'image' = 'file', linkedItem?: any, client?: Client): Observable<AppImage | Attachment> {
		const isImage = type === 'image';
		const fileName = file.name;
		const size = file.size;
		const request = isImage
			? new ImageUploadRequest({ fileName })
			: new AttachmentUploadRequest({ fileName, size });

		const service: GlobalService<any> = isImage
			? this.imageUploadRequestSrv
			: this.fileUploadRequestSrv;

		const returned = isImage
			? (request as ImageUploadRequest).image
			: (request as AttachmentUploadRequest).attachment;

		return service.create(request, client).pipe(
			// subscribing to that upload request so we can wait till it's ready
			mergeMap(_ =>
				service.waitForOne(`id == '${request.id}' AND status == 'upload-ready'`, undefined, client)
			),
			// we use filter instead putting the status into the waitForOne predicate because some images are
			// readonly (meaning we cannot give additional condition beside the id)
			// filter(info => info.status === 'upload-ready'),
			// when ready we make the upload
			mergeMap(info => this.uploadFileToAws(info, file, isImage)),
			// when the upload is done on amazon, the image will give a 403 for a few seconds
			// so we need to wait for it to be ready.
			mergeMap(_ => this.emitWhenFileReady(request) as any),
			// putting the request status to uploaded
			mergeMap(_ => service.update({ id: request.id, status: 'uploaded' }, client)),
			// sending the image back
			map(_ => returned)
		);
	}

	private uploadFileToAws(awsInfo, file: any, isImage: boolean): Observable<AppImage> {
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

		if (isImage) {
			formData.append('Content-Type', file.type);
			// </any>formData.append('Content-Disposition', 'attachment');
		}

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
	private emitWhenFileReady(request: ImageUploadRequest | AttachmentUploadRequest) {
		if (request instanceof ImageUploadRequest) {
			// query image, when error retries every 1s
			return this.queryImage(request).pipe(
				retryWhen(errors =>
					errors.pipe(
						delay(1000),
						take(15),
						delay(1000),
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
	private linkItem(
		files: AppImage[] | Attachment[],
		linkedItem: any, isImage: boolean,
		imageProperty = 'images',
		isArray = true
	): Observable<AppImage[] | Attachment[]> {

		// there is no linkedItem
		if (!linkedItem || !linkedItem.id)
			return of(files);
		// there is a linkedItem to update to and its an Image
		const srv = this.ermSrv.getGlobalServiceForEntity(linkedItem);
		if (isImage) {
			return srv.update({
				id: linkedItem.id,
				[imageProperty]: isArray ? [...linkedItem.images.map(img => ({ id: img.id })), ...files] : files[0]
			}).pipe(
				mapTo(files)
			);
			// there is a linkedItem to update to and its a File
		} else {
			const attachments = [...linkedItem.attachments, ...files];
			return srv.update({ id: linkedItem.id, attachments }).pipe(
				mapTo(files)
			);
		}
	}

	private queryFiles(isImage: boolean, files: AppImage[] | Attachment[]) {
		const baseSrv = isImage
			? this.imageSrv
			: this.attachmentSrv;

		const ids = (files as any[]).map(file => file.id);
		let query = ids.join('" OR id == "');
		if (ids.length >= 1)
			query = 'id == "' + query + '"';
		// if its an image we have to wait for the first item to have the urls ready
		// then we queryMany with take 0 which actually takes all (not using query all because we need a query)
		if (isImage && files.length)
			return baseSrv.waitForOne(`id == "${files[0].id}" AND urls.@size > 0`).pipe(
				switchMap(_ => baseSrv.queryMany({ query, take: 0 }))
			);
		// if its a file we don't need to wait to send the results
		else
			return baseSrv.queryMany({ query, take: 0 });
	}
}
