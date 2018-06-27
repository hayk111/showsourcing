import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../../global-services';
import { log } from '~utils';
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

	getImg(i) {
		return this.images[i];
	}
}
