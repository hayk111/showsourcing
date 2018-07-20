import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppImage } from '~models';

@Component({
	selector: 'image-previewer-app',
	templateUrl: './image-previewer.component.html',
	styleUrls: ['./image-previewer.component.scss'],
	host: {
		'[class.overflow]': 'hasOverflow'
	}
})
export class ImagePreviewerComponent {
	// array of images displayed
	@Input() images: Array<AppImage>;
	// whether we display the add button or not
	@Input() hasAdd = true;
	// display only the first row of images and the rest on overflow
	@Input() hasOverflow = false;
	// returns the index of the images clicked
	@Output() imageClick = new EventEmitter<number>();
	@Output() plusClick = new EventEmitter<any>();

	constructor() { }

	getImg(i) {
		return this.images[i];
	}
}
