import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { Log } from '~utils';
import { DEFAULT_NO_IMG } from '~utils/constants.const';
import { UserService } from '~app/features/user';
import { AppImage } from '~app/entity';

@Component({
	selector: 'carousel-app',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements OnInit {
	defaultImg = DEFAULT_NO_IMG;
	@Input() images: Array<AppImage> = [];
	@Input() selectedIndex = 0;
	@Input() pending = true;
	@Output() rotateRequest = new EventEmitter<AppImage>();
	@Output() deleteRequest = new EventEmitter<AppImage>();
	@Output() downloadRequest = new EventEmitter<AppImage>();
	@Output() addImage = new EventEmitter<AppImage>();

	modalOpen = false;
	menuOpen = false;

	constructor(private userSrv: UserService) { }

	ngOnInit() { }

	back(event) {
		Log.debug('[CarouselComponent] back');
		if (this.selectedIndex > 0) this.selectedIndex--;
		event.stopPropagation();
	}

	next(event) {
		Log.debug('[CarouselComponent] next');
		if (this.selectedIndex < this.images.length - 1) this.selectedIndex++;
		event.stopPropagation();
	}

	closeModal() {
		Log.debug('[CarouselComponent] close modal');
		this.modalOpen = false;
	}

	openModal() {
		Log.debug('[CarouselComponent] open modal');
		this.modalOpen = true;
	}

	closeMenu() {
		Log.debug('[CarouselComponent] close menu');
		this.menuOpen = false;
	}

	openMenu() {
		Log.debug('[CarouselComponent] open menu');
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
		if (this.images[index].urls) return this.images[index].urls.url_400x300;
		else return this.images[index].data;
	}

	getId() {
		return this.images[this.selectedIndex].id;
	}

	getRotation() {
		Log.debug('[CarouselComponent] getRotation');
		const img = this.getImg();
		if (img.pending) return img.rotation * -90;
		else return 0;
	}

	// when a preview is clicked we want to display the image that was in the preview
	onPreviewClick(index: number) {
		this.selectedIndex = index;
	}

	onFileAdded(files: Array<File>) {
		files.forEach(async file => {
			const image = await AppImage.newInstance(file, this.userSrv.userId);
			this.addImage.emit(image);
		});
	}
}
