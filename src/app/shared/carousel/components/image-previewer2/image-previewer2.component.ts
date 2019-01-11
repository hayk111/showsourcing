import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppImage } from '~models';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'image-previewer-2-app',
	templateUrl: './image-previewer2.component.html',
	styleUrls: ['./image-previewer2.component.scss'],
	host: {
		'[class.overflow]': 'showOneLine'
	}
})
export class ImagePreviewer2Component extends TrackingComponent {

	// array of images displayed
	@Input() images: Array<AppImage> = [];
	// returns the index of the images clicked
	@Output() imageClick = new EventEmitter<number>();

	constructor() {
		super();
	}

	getImg(i) {
		return this.images[i];
	}

	getPreviews() {
		return this.images.slice(0, 5);
	}

}
