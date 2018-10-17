import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild,
} from '@angular/core';
import { first } from 'rxjs/operators';
import { ProductFeatureService } from '~features/products/services';
import { ImageService } from '~global-services/image/image.service';
import { AppImage } from '~models';
import { DialogService } from '~shared/dialog';
import { UploaderService } from '~shared/file/services/uploader.service';
import { AutoUnsub, DEFAULT_IMG, PendingImage } from '~utils';

@Component({
	selector: 'product-carousel-app',
	templateUrl: './product-carousel.component.html',
	styleUrls: ['./product-carousel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCarouselComponent extends AutoUnsub {

	@Input() product;
	// whether the different elements are displayed
	@Input() favorite: boolean;

	@Input() set images(images: AppImage[]) {
		this._images = images;
	}
	get images() {
		return [...this._images, ...(this._pendingImages as any)];
	}

	private _images: AppImage[] = [];
	private _pendingImages: PendingImage[] = [];
	/** index of the currently selected image */
	selectedIndex = 0;
	/** hidden file input */
	@ViewChild('inpFile') inpFile: ElementRef;
	/** when a new image has been uploaded */
	@Output() imgUploaded = new EventEmitter<AppImage[]>();
	/** when the user clicks on the heart it means he favorited / unfavorited
	 * the item this carousel targets.
	 */
	@Output() productFavorite = new EventEmitter<null>();
	@Output() productUnfavorite = new EventEmitter<null>();
	@Output() requestFeedback = new EventEmitter<null>();
	@Output() vote = new EventEmitter<any>();
	@Output() openAddProject = new EventEmitter<null>();
	@Output() export = new EventEmitter<null>();
	@Output() imageDeleted = new EventEmitter<AppImage>();
	/** default image displayed when no image  */
	defaultImg = DEFAULT_IMG;
	// when clicking an image we can open a modal carousel
	modalOpen = false;

	constructor(
		private uploader: UploaderService,
		private productSrv: ProductFeatureService,
		private cd: ChangeDetectorRef
	) {
		super();
	}

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
		this.uploader.uploadImages(files, this.product).pipe(
			first()
		).subscribe(imgs => {
			// removing pending image
			this._pendingImages = this._pendingImages.filter(p => !uuids.includes(p.id));
		}, e => this._pendingImages = []);
	}


	/** when image is deleted */
	onDelete(image: AppImage) {
		// this.imageDeleted.emit(image);
		this.productSrv.onImageDeleted(this.product, image);
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

	/** when a preview is clicked we want to display the image that was in the preview */
	setSelectedIndex(index: number) {
		this.selectedIndex = index;
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
