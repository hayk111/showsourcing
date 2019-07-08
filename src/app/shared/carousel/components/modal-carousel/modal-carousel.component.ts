import { ESCAPE, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { AppImage } from '~models';

@Component({
	selector: 'modal-carousel-app',
	templateUrl: './modal-carousel.component.html',
	styleUrls: ['./modal-carousel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalCarouselComponent {

	@Input() images: Array<AppImage> = [];
	@Input() selectedIndex = 0;
	@Output() indexChange = new EventEmitter<number>();
	isOpen = false;


	@HostListener('document:keydown', ['$event'])
	onKeydownHandler(event: KeyboardEvent) {
		switch (event.keyCode) {
			case LEFT_ARROW: this.back(event);
				break;
			case RIGHT_ARROW: this.next(event);
				break;
			case ESCAPE: this.close();
				break;
		}
	}

	back(event) {
		if (this.selectedIndex > 0)
			this.selectedIndex--;
		else
			this.selectedIndex = this.images.length - 1;
		this.indexChange.emit(this.selectedIndex);
		event.stopPropagation();
	}

	next(event) {
		if (this.selectedIndex < this.images.length - 1)
			this.selectedIndex++;
		else
			this.selectedIndex = 0;
		this.indexChange.emit(this.selectedIndex);
		event.stopPropagation();
	}

	getRotation(img) {
		if (!img || !img.orientation)
			return 'none';
		else
			return 'rotate(' + (img.orientation * 90) % 360 + 'deg)';
	}

	getImg() {
		return this.images ? this.images[this.selectedIndex] : null;
	}

	open(index?: number) {
		if (Number.isInteger(index))
			this.selectedIndex = index;
		this.isOpen = true;
	}

	close() {
		this.isOpen = false;
	}

}
