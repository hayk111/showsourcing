import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppImage } from '~models';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'image-previewer-app',
	templateUrl: './image-previewer.component.html',
	styleUrls: ['./image-previewer.component.scss'],
	host: {
		'[class.overflow]': 'showOneLine'
	}
})
export class ImagePreviewerComponent extends TrackingComponent {
	/** size of the image box */
	@Input() size = '52';
	// array of images displayed
	@Input() images: Array<AppImage>;
	// whether we display the add button or not
	@Input() hasAdd = true;
	// display only the first row of images and the rest on overflow
	@Input() showOneLine = false;
	// returns the index of the images clicked
	@Output() imageClick = new EventEmitter<number>();
	@Output() plusClick = new EventEmitter<any>();

	constructor() {
		super();
	}

	getImg(i) {
		return this.images[i];
	}

	get styleBox() {
		return {
			height: this.size + 'px',
			width: this.size + 'px'
		};
	}
}
