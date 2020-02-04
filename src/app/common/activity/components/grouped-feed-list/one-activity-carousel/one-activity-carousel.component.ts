import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { timer } from 'rxjs';
import { map, take} from 'rxjs/operators';
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

	@ViewChild('cardSection', { static: false }) cardSection: ElementRef;

	private _images = [];
	/** default image displayed when no image  */
	defaultImg = DEFAULT_IMG;
	indexModal = -1;
	showArrows = false;

	constructor() { }

	ngOnInit() {
	}

	/** opens the modal carousel */
	openModal(index: number) {
		this.indexModal = this.selectedIndex + index;
	}

	/** closes the modal */
	closeModal() {
		this.indexModal = -1;
	}

	back(event) {
		event.stopPropagation();
		this.animateScroll(false);
	}

	next(event) {
		event.stopPropagation();
		this.animateScroll();
	}

	animateScroll(forth = true, timeInt = 5, stopValue = 40) {
		timer(timeInt, timeInt).pipe(
			map(i => {
				return stopValue - i;
			}),
			take(stopValue)
		).subscribe(_ => {
			this.cardSection.nativeElement.scrollLeft += forth ? 5 : -5;
		});
	}

}
