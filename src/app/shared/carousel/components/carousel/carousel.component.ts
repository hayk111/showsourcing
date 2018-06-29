import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { log } from '~utils';
import { DEFAULT_IMG } from '~utils/constants';
import { UserService } from '../../../../global-services';
import { AppImage } from '~models';

@Component({
	selector: 'carousel-app',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements OnInit {
	defaultImg = DEFAULT_IMG;
	@Input() images: Array<AppImage> = [];
	// index of currently displaying img
	@Input() selectedIndex = 0;
	@Output() rotateRequest = new EventEmitter<AppImage>();
	@Output() deleteRequest = new EventEmitter<AppImage>();
	@Output() downloadRequest = new EventEmitter<AppImage>();
	@Output() imgClick = new EventEmitter<number>();

	menuOpen = false;

	constructor(private userSrv: UserService) { }

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

	rotate() {
		this.rotateRequest.emit(this.getImg());
	}

	delete() {
		this.deleteRequest.emit(this.getImg());
	}

	download() {
		window.open(this.getImg().fileName);
		this.downloadRequest.emit(this.getImg());
	}

	getImg() {
		return this.images[this.selectedIndex];
	}

	getId() {
		return this.images[this.selectedIndex].id;
	}

	getRotation() {
		return 0;
	}

}
