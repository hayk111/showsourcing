import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ERMService } from '~core/entity-services/_global/erm.service';
import { AppImage, EntityMetadata, Product, Sample, Supplier } from '~core/models';
import { UploaderService } from '~shared/file/services/uploader.service';
import { AutoUnsub, DEFAULT_IMG, PendingImage } from '~utils';

@Component({
	selector: 'preview-carousel-app',
	templateUrl: './preview-carousel.component.html',
	styleUrls: ['./preview-carousel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewCarouselComponent extends AutoUnsub {

	@Input() entity: Product | Sample
		| Supplier;
	@Input() entityMD: EntityMetadata;
	@Input() objectFit: 'fill' | 'contain' | 'cover' | 'none' = 'cover';
	@Input() hasPreview: boolean;
	@Input() set images(images: AppImage[]) {
		this._images = images || [];
	}
	get images() {
		return [...this._images, ...(this._pendingImages as any)];
	}

	/** hidden file input */
	@ViewChild('inpFile', { static: true }) inpFile: ElementRef;

	private _images: AppImage[] = [];
	private _pendingImages: PendingImage[] = [];
	/** index of the currently selected image */
	selectedIndex = 0;
	// when clicking an image we can open a modal carousel
	modalOpen = false;
	/** default image displayed when no image  */
	defaultImg = DEFAULT_IMG;

	constructor(
		private uploader: UploaderService,
		private cd: ChangeDetectorRef,
		private ermSrv: ERMService
	) { super(); }

	/** opens the file browser window so the user can select a file he wants to upload */
	openFileBrowser() {
		this.inpFile.nativeElement.click();
	}

	/** when adding a new image, by selecting in the file browser or by dropping it on the component */
	async add(files: Array<File>) {
		if (files.length === 0)
			return;

		const uuids: string[] = await this.addPendingImg(files);
		this.cd.markForCheck();
		this.uploader.uploadImages(files, this.entity).subscribe(imgs => {
			// removing pending image
			this._pendingImages = this._pendingImages.filter(p => !uuids.includes(p.id));
		}, e => this._pendingImages = []);
	}

	/** when image is deleted */
	onDelete(image: AppImage) {
		const images = this.entity.images.filter(img => image.id !== img.id);
		this.ermSrv.getGlobalService(this.entityMD).update({ id: this.entity.id, images }).subscribe();
	}


	/** opens the modal carousel */
	openModal(index: number) {
		this.selectedIndex = index;
		this.modalOpen = true;
	}

	/** closes the modal */
	closeModal() {
		this.modalOpen = false;
	}

	/** adds pending image to the list */
	private async addPendingImg(files: File[]) {
		// adding a pending image so we can see there is an image pending visually
		let pendingImgs: PendingImage[] = files.map(file => new PendingImage(file));
		pendingImgs = await Promise.all(pendingImgs.map(p => p.createData()));
		this._pendingImages.push(...pendingImgs);
		// putting the index at the end so we instantly have feedback the image is being processed
		this.selectedIndex = this.images.length - 1;
		return pendingImgs.map(p => p.id);
	}

}
