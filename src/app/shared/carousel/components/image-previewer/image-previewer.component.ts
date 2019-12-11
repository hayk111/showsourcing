import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class ImagePreviewerComponent extends TrackingComponent implements OnInit {

	/** array of images displayed */
	@Input() images: Array<AppImage> = [];
	/** size in px of the images */
	@Input() size = 48;
	/** whether previews can be deleted */
	@Input() isDeletable = false;
	// index of currently displaying img
	@Input() selectedIndex = 0;
	/** returns the index of the images clicked */
	@Output() imageClick = new EventEmitter<number>();
	@Output() delete = new EventEmitter<AppImage>();
	@Output() previous = new EventEmitter<any>();
	@Output() next = new EventEmitter<any>();

	imagesWithIndices: Array<any>;

	constructor() {
		super();
	}

	ngOnInit(): void {
		this.imagesWithIndices = [];

		this.images.forEach((image: AppImage, i) => {
			this.imagesWithIndices.push({
				image,
				index: i
			});
		});
	}

	getPreviews() {
		if (this.selectedIndex >= 5) {
			return this.imagesWithIndices.slice(this.selectedIndex - 4, this.selectedIndex + 1);
		}

		return this.imagesWithIndices.slice(0, 5);
	}

	getStyle() {
		const size = `${this.size}px`;
		return {
			width: size,
			height: size
		};
	}

	doDelete(event: MouseEvent, img: AppImage) {
		event.stopPropagation();
		this.delete.emit(img);
	}

}
