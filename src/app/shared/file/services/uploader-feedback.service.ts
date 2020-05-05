import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { AttachmentService } from '~core/erm';
import { ImageService } from '~core/erm';
import { AppImage, Attachment } from '~core/erm';
import { PendingFile } from '~utils/pending-file.class';
import { PendingImage } from '~utils/pending-image.class';

import { UploaderService } from './uploader.service';



/**
 * this service is different from UploaderService as it's only used to see the rendering of
 * a pending image / file onto the screen
 */
@Injectable({ providedIn: 'root' })
export class UploaderFeedbackService {

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

	setImages(images: AppImage[]) {
		if (images) {
			// remove undefined in case we are passing [undefined]
			// for example in for contact we only have one image so we do [images]="[contact.businessCardImage]"
			this._images = images.filter(x => !!x);
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

	/** when adding a new image,
	 * this will first generate a base64 version so we can display it instantly */
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
		// creating base64 data and refreshing view when it's done
		Promise.all(pendingImgs.map(p => p.createData()))
			.then(_ => {
				this._pendingImages = this._pendingImages.map((p: PendingImage) => ({ ...p } as PendingImage));
				this.cd.markForCheck();
			});

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
