import { Directive, ElementRef, HostListener, OnInit, Input, HostBinding, OnChanges, SimpleChange } from '@angular/core';
import { AppImage } from '~core/erm';

@Directive({
	selector: '[rotate]',
})
export class RotateDirective implements OnInit, OnChanges {
	// tslint:disable-next-line:no-input-rename
	@Input('rotationImg') image: AppImage;

	@HostBinding('style.transform')
	transform = 'none';

	constructor(private elRef: ElementRef) {
	}

	ngOnInit() {
		this.transform = this.getRotation(this.image);
	}

	ngOnChanges(change) {
		this.transform = this.getRotation(change.image.currentValue);
	}

	getRotation(img) {
		if (!img || !img.orientation) {
			return 'none';
		}

		return 'rotate(' + (img.orientation * 90) % 360 + 'deg)';
	}
}
