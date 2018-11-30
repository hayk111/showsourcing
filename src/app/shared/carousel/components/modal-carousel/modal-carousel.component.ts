import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { log } from '~utils';
import { ChangeDetectionStrategy } from '@angular/core';
import { AppImage } from '~models';

@Component({
	selector: 'modal-carousel-app',
	templateUrl: './modal-carousel.component.html',
	styleUrls: ['./modal-carousel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalCarouselComponent implements OnInit {
	@Input() images: Array<AppImage> = [];
	@Input() selectedIndex = 0;
	@Output() close = new EventEmitter<Event>();

	constructor() { }

	ngOnInit() {
	}

	back(event) {
		log.debug('[ModalCarouselComponent] back');
		if (this.selectedIndex > 0)
			this.selectedIndex--;
		event.stopPropagation();
	}

	next(event) {
		log.debug('[ModalCarouselComponent] next');
		if (this.selectedIndex < this.images.length - 1)
			this.selectedIndex++;
		event.stopPropagation();
	}


	getImg() {
		return this.images ? this.images[this.selectedIndex] : null;
	}

}
