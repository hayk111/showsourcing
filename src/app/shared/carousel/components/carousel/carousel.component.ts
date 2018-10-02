import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { AppImage } from '~models';
import { ImageComponent } from '~shared/image/components/image/image.component';
import { DEFAULT_IMG } from '~utils/constants';
import { ImageService } from '~global-services/image/image.service';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { DialogService } from '~shared/dialog';

@Component({
	selector: 'carousel-app',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements OnInit {
	defaultImg = DEFAULT_IMG;
	@ViewChild('imgApp') imgApp: ImageComponent;


	@Input() set images(img: Array<AppImage>) {
		this._images = img;
	}
	get images() {
		return this._images;
	}
	private _images = [];
	// index of currently displaying img
	@Input() selectedIndex = 0;
	@Output() deleted = new EventEmitter<AppImage>();
	@Output() imgClick = new EventEmitter<number>();

	menuOpen = false;

	constructor(
		private imageSrv: ImageService,
		private dlgSrv: DialogService
	) { }

	ngOnInit() { }

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

	closeMenu() {
		this.menuOpen = false;
	}

	openMenu() {
		this.menuOpen = true;
	}

	/** rotates the image by 90 degrees */
	rotate() {
		const img = this.getImg();
		img.orientation = (img.orientation + 1) % 4;
		this.imageSrv.update({
			...img,
			orientation: img.orientation
		}).subscribe();
	}


	/** deletes the image */
	delete() {
		const img = this.getImg();

		this.dlgSrv.open(ConfirmDialogComponent, {
			text: 'Are you sure you want to remove this image ?',
			callback: () => {
				this.selectedIndex = this.selectedIndex - 1 >= 0 ? this.selectedIndex - 1 : 0;
				this.deleted.emit(img);
				this.imageSrv.delete(img.id).subscribe();
			}
		});
	}

	/** start downloading the image */
	download() {
		const img = this.getImg();
		this.imageSrv.download(img);
	}

	getImg() {
		return this.images[this.selectedIndex];
	}

	getId() {
		return this.images[this.selectedIndex].id;
	}

	getRotation(img) {
		if (!img || !img.orientation)
			return 'none';
		else
			return 'rotate(' + (img.orientation * 90) % 360 + 'deg)';
	}

}
