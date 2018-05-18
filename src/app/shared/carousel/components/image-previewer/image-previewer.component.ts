import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '~features/user';
import { Log } from '~app-root/utils';
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

	// getting the url for the image at index
	getUrl(index) {
		if (this.images[index].fileName)
			return this.images[index].fileName;
		else
			return this.images[index].fileName;
	}

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
