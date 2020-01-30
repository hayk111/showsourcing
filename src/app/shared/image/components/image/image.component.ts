import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AppImage } from '~core/erm';

@Component({
	selector: 'img-app',
	templateUrl: './image.component.html',
	styleUrls: ['./image.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent {
	private _image: AppImage;

	get image(): any {
		return this._image;
	}
	@Input() set image(value: any) {
		this._image = value;
	}
	@Input() size: string;
	// type of the image (supplier, product, user...)
	// so we can have an appropriate default image
	@Input() type: string;
	@Input() objectFit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' = 'cover';

	constructor() { }


}
