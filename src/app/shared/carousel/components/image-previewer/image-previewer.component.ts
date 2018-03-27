import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '~app/features/user';
import { Log } from '~app/app-root/utils';
import { AppImage } from '~app/entity';

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

	constructor(private userSrv: UserService) { }

	// getting the url for the image at index
	getUrl(index) {
		if (this.images[index].urls) return this.images[index].urls.url_220x165;
		else return this.images[index].data;
	}

	getRotation(i) {
		const img = this.getImg(i);
		if (img.pending) return img.rotation * -90;
		else return 0;
	}

	getImg(i) {
		return this.images[i];
	}
}
