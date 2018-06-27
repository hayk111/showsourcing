import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AppImage } from '~models';

@Component({
	selector: 'img-app',
	templateUrl: './image.component.html',
	styleUrls: ['./image.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent {
	@Input() image: AppImage;
	@Input() size: string;

	constructor() { }

	getRotation() {
		if (!this.image || !this.image.orientation)
			return undefined;
		else
			return 'rotate(' + (this.image.orientation * 90) % 360 + 'deg)';
	}

}
