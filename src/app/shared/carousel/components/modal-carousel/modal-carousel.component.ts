import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AppFile } from '~features/file';
import { Log } from '~utils/index';
import { AppImage } from '~features/file';
import { ChangeDetectionStrategy } from '@angular/core';

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
		Log.debug('[ModalCarouselComponent] back');
		if (this.selectedIndex > 0)
			this.selectedIndex--;
		event.stopPropagation();
	}

	next(event) {
		Log.debug('[ModalCarouselComponent] next');
		if (this.selectedIndex < this.images.length - 1)
			this.selectedIndex++;
		event.stopPropagation();
	}

	getUrl(index) {
		Log.debug('[CarouselComponent] getUrl');
		return this.images[index].urls.url_1000x1000;
	}

}
