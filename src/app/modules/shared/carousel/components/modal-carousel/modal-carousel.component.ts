import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AppFile } from '../../../../store/model/app-file.model';
import Log from '../../../../../utils/logger/log.class';
import { AppImage } from '../../../../store/model/app-image.model';

@Component({
	selector: 'modal-carousel-app',
	templateUrl: './modal-carousel.component.html',
	styleUrls: ['./modal-carousel.component.scss']
})
export class ModalCarouselComponent implements OnInit {
	@Input() images: Array<AppImage>;
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
