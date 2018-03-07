import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppImage } from '~app/features/file';
import { UserService } from '~app/features/user';

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
	@Output() fileAdded = new EventEmitter<AppImage>();

	constructor(private userSrv: UserService) {}

	// getting the url for the image at index
	getUrl(index) {
		if (this.images[index].urls) return this.images[index].urls.url_220x165;
		else return this.images[index].data;
	}
}
