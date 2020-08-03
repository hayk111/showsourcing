import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppImage } from '~core/erm';
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

	/** array of images displayed */
	private _images: Array<AppImage> = [];
	@Input() set images(images: Array<AppImage>) {
		this._images = images.filter((img: any) => !!img.url && !img.pending);
		this.imagesWithIndices = [];

		this.images.forEach((image: AppImage, i) => {
			this.imagesWithIndices.push({
				image,
				index: i
			});
		});
	}
	get images() {
		return this._images;
	}
	/** size in px of the images */
	@Input() size = 44;
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

	getRotation(img) {
		if (!img || !img.orientation) return 'none';
		else return 'rotate(' + ((img.orientation * 90) % 360) + 'deg)';
	}

	doDelete(event: MouseEvent, img: AppImage) {
		event.stopPropagation();
		this.delete.emit(img);
	}

}
