import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import Log from '../../../../../utils/logger/log.class';
import { AppFile } from '../../../../store/model/app-file.model';
import { AppImage } from '../../../../store/model/app-image.model';
import { Store } from '@ngrx/store';
import { ImageActions } from '../../../../store/action/images.action';

@Component({
	selector: 'carousel-app',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements OnInit {
	@Input() images: Array<AppImage> = [];
	@Input() selectedIndex = 0;
	@Output() rotateRequest = new EventEmitter<AppImage>();
	@Output() deleteRequest = new EventEmitter<AppImage>();
	@Output() downloadRequest = new EventEmitter<AppImage>();

	modalOpen = false;
	menuOpen = false;

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

	closeMenu() {
		Log.debug('[CarouselComponent] close menu');
		this.menuOpen = false;
	}

	openMenu() {
		Log.debug('[CarouselComponent] close menu');
		this.menuOpen = true;
	}

	rotate() {
		Log.debug('[CarouselComponent] rotate');
		this.rotateRequest.emit(this.getImg());
	}

	delete() {
		Log.debug('[CarouselComponent] delete');
		this.deleteRequest.emit(this.getImg());
	}

	download() {
		Log.debug('[CarouselComponent] download');
		window.open(this.getImg().urls.url_1000x1000);
		this.downloadRequest.emit(this.getImg());
	}

	getImg() {
		Log.debug('[CarouselComponent] getImg');
		return this.images[this.selectedIndex];
	}

	getUrl(index) {
		Log.debug('[CarouselComponent] getUrl');
		return this.images[index].urls.url_1000x1000;
	}

	getId() {
		return this.images[this.selectedIndex].id;
	}

	getRotation() {
		Log.debug('[CarouselComponent] getRotation');
		const img = this.getImg();
		if (img.pending)
			return this.images[this.selectedIndex].rotation * -90;
		else
			return 0;
	}

}
