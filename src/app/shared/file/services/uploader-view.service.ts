import { AppImage, Attachment } from '~core/models';
import { Injectable, ChangeDetectorRef } from '@angular/core';
import { PendingImage } from '~utils/pending-image.class';
import { UploaderService } from './uploader.service';
import { first } from 'rxjs/operators';
import { PendingFile } from '~utils/pending-file.class';



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

	constructor(private cd: ChangeDetectorRef, private uploaderSrv: UploaderService) { }


	init(config: UploaderFeedbackConfig) {
		Object.assign(this, config);
	}

	setImages(images: AppImage[]) {
		// remove unefined in case we are passing [undefined]
		// for example in for contact we only have one image so we do [images]="[contact.businessCardImage]"
		this._images = images.filter(x => !!x);
	}

	getImages() {
		return [...this._images, ...(this._pendingImages as any)];
	}

	setFiles(files: Array<Attachment | PendingFile>) {
		this._files = files || [];
	}

	getFiles(): Array<Attachment | PendingFile> {
		return [...this._files, ...this._pendingFiles];
	}


	/** when adding a new image, by selecting in the file browser or by dropping it on the component */
	async addImages(files: Array<File>) {
		if (files.length === 0)
			return;

		const uuids: string[] = await this.addPendingImgs(files);
		this.cd.markForCheck();
		this.uploaderSrv.uploadImages(files, this.linkedEntity, this.imageProperty, this.isImagePropertyArray).pipe(
			first()
		).subscribe(imgs => {
			// removing pending image
			this._pendingImages = this._pendingImages.filter(p => !uuids.includes(p.id));
		}, e => this._pendingImages = []);
	}

	/** adds pending image to the list */
	private async addPendingImgs(files: File[]) {
		// adding a pending image so we can see there is an image pending visually
		let pendingImgs: PendingImage[] = files.map(file => new PendingImage(file));
		pendingImgs = await Promise.all(pendingImgs.map(p => p.createData()));
		this._pendingImages.push(...pendingImgs);
		return pendingImgs.map(p => p.id);
	}

	addFiles(files: Array<File>) {
		this._pendingFiles = files.map(file => new PendingFile(file));
		const uuids = this._pendingFiles.map(f => f.id);
		this.uploaderSrv.uploadFiles(files, this.linkedEntity)
			.subscribe(
				addedFiles => this._pendingFiles = this._pendingFiles.filter(p => !uuids.includes(p.id)),
				e => this._pendingFiles = []
			);
	}

}
