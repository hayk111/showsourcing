import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Image } from 'showsourcing-api-lib';

@Component({
	selector: 'img-app',
	templateUrl: './image.component.html',
	styleUrls: ['./image.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent {
	private _image: Image;

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

	@Input() pending = false;

	// TODO: quick solution for the image previews, refactor this and remov width and height
	@Input() width = '100%';
	@Input() height = '100%';

	constructor(private sanitizer: DomSanitizer) { }



}
