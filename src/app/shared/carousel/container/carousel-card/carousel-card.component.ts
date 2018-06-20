

import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Observable } from 'rxjs';
import { AutoUnsub, DEFAULT_IMG } from '~utils';
import { AppImage, } from '~models';
import { UserService } from '~shared/global-services';
import { map } from 'rxjs/operators';

@Component({
	selector: 'carousel-card-app',
	templateUrl: './carousel-card.component.html',
	styleUrls: ['./carousel-card.component.scss'],
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
	/** default image displayed when no image  */
	defaultImg = DEFAULT_IMG;
	// when clicking an image we can open a modal carousel
	modalOpen = false;

	constructor(private userSrv: UserService) {
		super();
	}

	ngOnInit() { }
	/** opens the file browser window so the user can select a file he wants to upload */
	openFileBrowser() {
		this.inpFile.nativeElement.click();
	}

	/** when adding a new image, by selecting in the file browser or by dropping it on the component */
	add(files: Array<File>) {
		// const conversions = files.map(file => AppImage.newInstance(file));
		// Promise.all(conversions).then(appImages => this.store.dispatch(fromImage.Actions.add(appImages)));
	}

	/** rotates the image by 90 degrees */
	rotate(img: AppImage) {
		// this.store.dispatch(fromImage.Actions.rotate(img));
	}

	/** deletes the image */
	delete(img: AppImage) {
		// this.store.dispatch(fromImage.Actions.delete([img.id]));
	}

	/** start downloading the image */
	download(img: AppImage) {
		// this.store.dispatch(fromImage.Actions.download(img.url));
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
