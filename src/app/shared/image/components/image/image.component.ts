import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AppImage } from '~models';

@Component({
	selector: 'img-app',
	templateUrl: './image.component.html',
	styleUrls: ['./image.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent {
	private _image: AppImage;
	public transform = 'none';

	get image(): any {
		return this._image;
	}
	@Input() set image(value: any) {
		this._image = value;
	};
	@Input() size: string;
	// type of the image (supplier, product, user...)
	// so we can have an appropriate default image
	@Input() type: string;
	@Input() objectFit: 'fill' | 'contain' | 'cover' = 'cover';

	constructor() { }

	getRotation() {
		if (!this.image || !this.image.orientation)
			return 'none';
		else
			return 'rotate(' + (this.image.orientation * 90) % 360 + 'deg)';
	}
	rotate() {
		this.transform = this.getRotation();	
	}
}
