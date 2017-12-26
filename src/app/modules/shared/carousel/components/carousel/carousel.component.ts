import { Component, OnInit, Input } from '@angular/core';
import Log from '../../../../../utils/logger/log.class';
import { AppFile } from '../../../../store/model/app-file.model';
import { AppImage } from '../../../../store/model/app-image.model';

@Component({
	selector: 'carousel-app',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
	@Input() images: Array<AppImage>;
	@Input() selectedIndex = 0;
	modalOpen = false;
	rotation = 0;

	constructor() { }

	ngOnInit() {
	}

	back(event) {
		Log.debug('[CarouselComponent] back');
		if (this.selectedIndex > 0)
			this.selectedIndex--;
		event.stopPropagation();
	}

	next(event) {
		Log.debug('[CarouselComponent] next');
		if (this.selectedIndex < this.images.length - 1)
			this.selectedIndex++;
		event.stopPropagation();
	}

	closeModal() {
		Log.debug('[CarouselComponent] close modal');
		this.modalOpen = false;
	}

	openModal() {
		Log.debug('[CarouselComponent] close modal');
		this.modalOpen = true;
	}

	rotate() {
		Log.debug('[CarouselComponent] rotate');
		this.rotation += 90;
	}

	getUrl(index) {
		Log.debug('[CarouselComponent] getUrl');
		return this.images[index].urls.url_1000x1000;
	}

}
