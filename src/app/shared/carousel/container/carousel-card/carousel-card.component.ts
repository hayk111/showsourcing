import {
	Component, ElementRef, Input, OnInit, ViewChild, ChangeDetectionStrategy,
	Output, EventEmitter, ChangeDetectorRef
} from '@angular/core';
import { AppImage } from '~models';
import { AutoUnsub, DEFAULT_IMG } from '~utils';
import { UploaderService } from '~shared/file/services/uploader.service';
import { first } from 'rxjs/operators';
import { ImageService } from '~global-services/image/image.service';
import { PendingImage } from '~utils/pending-image.class';



@Component({
	selector: 'carousel-card-app',
	templateUrl: './carousel-card.component.html',
	styleUrls: ['./carousel-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselCardComponent extends AutoUnsub implements OnInit {
	// whether the different elements are displayed
	@Input() hasModalCarousel = true;
	// whether the little clickable thumbnail of the images are displayed
	@Input() hasPreview = true;
	// whether the card displays a carousel at all
	@Input() hasInlineCarousel = true;
	// whether the card displays a footer (with a button add picture)
	@Input() hasFooter = true;
	// title of the card
	@Input() title = '';
	// whether the card has an heart at the top left to favorite an item
	@Input() hasHeart = true;
	// whether the heart is full or not
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
	@Output() favorited = new EventEmitter<undefined>();
	@Output() unfavorited = new EventEmitter<undefined>();
	/** default image displayed when no image  */
	defaultImg = DEFAULT_IMG;
	// when clicking an image we can open a modal carousel
	modalOpen = false;

	constructor(
		private uploader: UploaderService,
		private imageSrv: ImageService,
		private cd: ChangeDetectorRef
	) {
		super();
	}

	ngOnInit() { }
	/** opens the file browser window so the user can select a file he wants to upload */
	openFileBrowser() {
		this.inpFile.nativeElement.click();
	}

	/** when adding a new image, by selecting in the file browser or by dropping it on the component */
	async add(files: Array<File>) {
		this.uploader.uploadImages(files).pipe(
			first()
		).subscribe(imgs => {
			this.imgUploaded.emit(imgs);
			// removing pending image
			this._pendingImages = [];
		}, e => this._pendingImages = []);
		// adding a pending image so we can see there is an image pending visually
		let pendingImgs: PendingImage[] = files.map(file => new PendingImage(file));
		pendingImgs = await Promise.all(pendingImgs.map(p => p.createData()));
		this._pendingImages = pendingImgs;
		this.cd.detectChanges();
	}

	/** rotates the image by 90 degrees */
	rotate(img: AppImage) {
		this.imageSrv.update({
			...img,
			orientation: (img.orientation + 1) % 4
		}).subscribe();
	}

	/** deletes the image */
	delete(img: AppImage) {
		this.imageSrv.deleteOne(img.id).subscribe();
	}

	/** start downloading the image */
	download(img: AppImage) {
		this.imageSrv.download(img);
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

}
