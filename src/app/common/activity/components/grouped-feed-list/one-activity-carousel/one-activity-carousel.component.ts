import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { AppImage } from '~models';
import { DEFAULT_IMG } from '~utils';

@Component({
	selector: 'one-activity-carousel-app',
	templateUrl: './one-activity-carousel.component.html',
	styleUrls: ['./one-activity-carousel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneActivityCarouselComponent implements OnInit {

	@Input() set images(img: Array<AppImage>) {
		this._images = img;
	}
	@Input() selectedIndex = 0;
	@Output() imgClick = new EventEmitter<number>();

	get images() {
		return this._images;
	}

	private _images = [];
	/** default image displayed when no image  */
	defaultImg = DEFAULT_IMG;
	indexModal = -1;

	constructor() { }

	ngOnInit() {
	}

	back(event) {
		if (this.selectedIndex > 0)
			this.selectedIndex--;
		event.stopPropagation();
	}

	next(event) {
		if (this.selectedIndex < this.images.length - 1)
			this.selectedIndex++;
		event.stopPropagation();
	}

	/** opens the modal carousel */
	openModal(index: number) {
		this.indexModal = this.selectedIndex + index;
	}

	/** closes the modal */
	closeModal() {
		this.indexModal = -1;
	}


}
