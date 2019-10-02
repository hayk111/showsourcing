import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { first, tap, catchError, switchMap } from 'rxjs/operators';
import { AttachmentService } from '~core/entity-services';
import { ImageService } from '~core/entity-services/image/image.service';
import { AppImage, Attachment } from '~core/models';
import { PendingFile } from '~utils/pending-file.class';
import { PendingImage } from '~utils/pending-image.class';

import { UploaderService } from './uploader.service';



export interface UploaderFeedbackConfig {
	linkedEntity: any;
	imageProperty?: string;
	isImagePropertyArray?: boolean;
}


/** this service is different from UploaderService as it's only used to see the rendering of
 * a pending image / file onto the screen
 */
@Injectable({ providedIn: 'root' })
export class UploaderFeedbackService {

	// when the uploader service links an image to an item
	// we need to know to which property we need to link it and if the property is an array
	private linkedEntity: any;
	private imageProperty = 'images';
	private isImagePropertyArray = true;
	private _images: AppImage[] = [];
	private _files: Array<Attachment | PendingFile>;
	private _pendingFiles: PendingFile[] = [];
	private _pendingImages: PendingImage[] = [];
	private _uploaded$: Subject<AppImage[] | Attachment[]> = new Subject();

	uploaded$ = this._uploaded$.asObservable();

	constructor(
		private cd: ChangeDetectorRef,
		private uploaderSrv: UploaderService,
		private imgSrv: ImageService,
		private attachmentSrv: AttachmentService,
	) { }


	init(config: UploaderFeedbackConfig) {
		Object.assign(this, config);
	}

	setImages(images: AppImage[]) {
		if (images) {
			// remove unefined in case we are passing [undefined]
			// for example in for contact we only have one image so we do [images]="[contact.businessCardImage]"
			this._images = images.filter(x => !!x);
			this._pendingImages = [];
		}
	}

	getImages() {
		return [...this._images, ...(this._pendingImages as any)];
	}

	setFiles(files: Attachment[]) {
		this._files = files || [];
	}

	getFiles(): Attachment[] {
		return [...this._files, ...this._pendingFiles] as Attachment[];
	}

	/** when adding a new image, by selecting in the file browser or by dropping it on the component */
	addImages(files: Array<File>) {
		if (files.length === 0)
			return;

		const uuids: string[] = this.addPendingImgs(files).map(p => p.id);
		this.cd.markForCheck();
		// since the this.linkedEntity is only set in the init, its image array is not up to date, so we need to update it
		const linkedEntity = { ...this.linkedEntity, images: this._images };
		return this.uploaderSrv.uploadImages(files, linkedEntity, this.imageProperty, this.isImagePropertyArray)
			.pipe(
				first(),
				tap(addedImgs => this.onSuccessImg(addedImgs, uuids)),
				catchError(e => this._pendingFiles = [])
			);
	}

	/** adds pending image to the list */
	private addPendingImgs(files: File[]) {
		// adding a pending image so we can see there is an image pending visually
		const pendingImgs: PendingImage[] = files.map(file => new PendingImage(file));
		this._pendingImages.push(...pendingImgs);
		Promise.all(pendingImgs.map(p => p.createData()));
		return pendingImgs;
	}

	private onSuccessImg(addedImgs: AppImage[], uuids: string[]) {
		this._uploaded$.next(addedImgs);
		this._pendingImages = this._pendingImages.filter(p => !uuids.includes(p.id));
		this.cd.markForCheck();
	}

	deleteImg(img: AppImage) {
		this.imgSrv.delete(img.id).subscribe();
	}

	addFiles(files: Array<File>) {
		this._pendingFiles = files.map(file => new PendingFile(file));
		const uuids = this._pendingFiles.map(f => f.id);
		// since the linked entity is setup once at the start we need to update the attachments
		return this.uploaderSrv.uploadFiles(files, { ...this.linkedEntity, attachments: this._files })
			.pipe(
				first(),
				tap(addedFiles => this.onSuccessFile(addedFiles, uuids)),
				catchError(e => this._pendingFiles = [])
			);
	}

	private onSuccessFile(addedFiles: Attachment[], uuids: string[]) {
		this._uploaded$.next(addedFiles);
		this._pendingFiles = this._pendingFiles.filter(p => !uuids.includes(p.id));
		this.cd.markForCheck();
	}

	deleteFile(file: Attachment) {
		this.attachmentSrv.delete(file.id).subscribe();
	}

}
