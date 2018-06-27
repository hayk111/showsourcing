import { Component, ElementRef, Input, OnInit, ViewChild, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { AppImage } from '~models';
import { UserService } from '../../../../global-services';
import { AutoUnsub, DEFAULT_IMG } from '~utils';
import { UploaderService } from '~shared/file/services/uploader.service';
import { first } from 'rxjs/operators';
import { ImageService } from '~global-services/image/image.service';



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

	@Input() images: AppImage[] = [];
	/** index of the currently selected image */
	selectedIndex = 0;
	/** hidden file input */
	@ViewChild('inpFile') inpFile: ElementRef;
	/** when a new image has been uploaded */
	@Output() imgUploaded = new EventEmitter<AppImage[]>();
	/** default image displayed when no image  */
	defaultImg = DEFAULT_IMG;
	// when clicking an image we can open a modal carousel
	modalOpen = false;

	constructor(
		private uploader: UploaderService,
		private imageSrv: ImageService
	) {
		super();
	}

	ngOnInit() { }
	/** opens the file browser window so the user can select a file he wants to upload */
	openFileBrowser() {
		this.inpFile.nativeElement.click();
	}

	/** when adding a new image, by selecting in the file browser or by dropping it on the component */
	add(files: Array<File>) {
		this.uploader.uploadImages(files).pipe(
			first()
		).subscribe(imgs => this.imgUploaded.emit(imgs));
	}

	/** rotates the image by 90 degrees */
	rotate(img: AppImage) {
		this.imageSrv.update({
			...img,
			orientation: (img.orientation + 1) % 4
		});
	}

	/** deletes the image */
	delete(img: AppImage) {
		this.imageSrv.deleteOne(img.id);
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
