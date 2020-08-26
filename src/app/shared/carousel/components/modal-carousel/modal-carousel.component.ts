import { ESCAPE, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, ChangeDetectorRef } from '@angular/core';
import { AppImage } from '~core/erm';
import { slideAnimation } from '~shared/carousel/components/animations/slide.animations';

@Component({
	selector: 'modal-carousel-app',
	templateUrl: './modal-carousel.component.html',
	styleUrls: ['./modal-carousel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [slideAnimation]
})
export class ModalCarouselComponent {

	@Input() images: Array<AppImage> = [];
	@Input() selectedIndex = 0;
	@Input() entity: any;
	@Output() indexChange = new EventEmitter<number>();
	@Output() openFileBrowser = new EventEmitter<void>();
	@Output() delete = new EventEmitter();
	isOpen = false;
	slideAnimationState = 'inactive';
	direction = 'none';

	constructor(private cdr: ChangeDetectorRef) {}

	@HostListener('document:keydown', ['$event'])
	onKeydownHandler(event: KeyboardEvent) {
		switch (event.keyCode) {
			case LEFT_ARROW: this.back(event);
				break;
			case RIGHT_ARROW: this.next(event);
				break;
			case ESCAPE: this.close(event);
				break;
		}
	}
	toggleSlideAnimationState() {
		this.slideAnimationState = (this.slideAnimationState === 'inactive' ? 'active' : 'inactive');
	}

	back(event) {
		this.direction = 'back';
		this.toggleSlideAnimationState();
		this.slideAnimationDone();
		event.stopPropagation();
	}

	next(event) {
		this.direction = 'next';
		this.toggleSlideAnimationState();
		this.slideAnimationDone();
		event.stopPropagation();
	}

	showPreviousImage() {
		if (this.slideAnimationState === 'active') return;
		if (this.selectedIndex > 0) {
			this.selectedIndex--;
		} else {
			this.selectedIndex = this.images.length - 1;
		}
		this.cdr.detectChanges();
		this.indexChange.emit(this.selectedIndex);
		this.toggleSlideAnimationState();
	}

	showNextImage() {
		if (this.slideAnimationState === 'active') return;
		if (this.selectedIndex < this.images.length - 1) {
			this.selectedIndex++;
		} else {
			this.selectedIndex = 0;
		}
		this.cdr.detectChanges();
		this.indexChange.emit(this.selectedIndex);
		this.toggleSlideAnimationState();
	}

	slideAnimationDone() {
		switch (this.direction) {
			case 'close':
				this.isOpen = false;
				break;
			case 'next':
				this.showNextImage();
				break;
			case 'back':
				this.showPreviousImage();
				break;
			default:
				return;
		}
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

	onDelete(ev: Event) {
		this.close(ev);
		this.delete.emit();
	}

	open(index?: number) {
		// Do not open preview if there's no image
		if (!this.images.length) {
			return;
		}
		this.direction = 'open';
		this.slideAnimationState = 'active';
		if (Number.isInteger(index)) {
			this.selectedIndex = index;
		}
		this.isOpen = true;
		this.cdr.markForCheck();
	}

	close(ev: Event) {
		ev.stopPropagation();
		this.isOpen = false;
		this.direction = 'close';
		this.slideAnimationState = 'inactive';
		this.cdr.markForCheck();
	}

}
