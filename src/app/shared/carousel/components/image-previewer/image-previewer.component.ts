import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../../global-services';
import { Log } from '~utils';
import { AppImage } from '~models';

@Component({
	selector: 'image-previewer-app',
	templateUrl: './image-previewer.component.html',
	styleUrls: ['./image-previewer.component.scss'],
})
export class ImagePreviewerComponent {
	// array of images displayed
	@Input() images: Array<AppImage>;
	// returns the index of the images clicked
	@Output() imageClick = new EventEmitter<number>();
	@Output() plusClick = new EventEmitter<any>();

	constructor() { }

	getRotation(i) {
		// const img = this.getImg(i);
		// if (img.pending)
		// 	return img.rotation * -90;
		// else
		// 	return 0;
	}

	getImg(i) {
		return this.images[i];
	}
}
