import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppImage } from '~app/features/file';

@Component({
	selector: 'image-previewer-app',
	templateUrl: './image-previewer.component.html',
	styleUrls: ['./image-previewer.component.scss'],
})
export class ImagePreviewerComponent implements OnInit {
	@Input() images: Array<AppImage>;
	@Output() imageClick = new EventEmitter<string>();

	constructor() {}

	ngOnInit() {}

	getUrl(index) {
		if (this.images[index].urls) return this.images[index].urls.url_220x165;
		else return this.images[index].data;
	}
}
