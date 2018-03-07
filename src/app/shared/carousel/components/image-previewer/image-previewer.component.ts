import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppImage } from '~app/features/file';
import { UserService } from '~app/features/user';

@Component({
	selector: 'image-previewer-app',
	templateUrl: './image-previewer.component.html',
	styleUrls: ['./image-previewer.component.scss'],
})
export class ImagePreviewerComponent implements OnInit {
	@Input() images: Array<AppImage>;
	@Output() imageClick = new EventEmitter<string>();
	@Output() addImage = new EventEmitter<AppImage>();

	constructor(private userSrv: UserService) {}

	ngOnInit() {}

	getUrl(index) {
		if (this.images[index].urls) return this.images[index].urls.url_220x165;
		else return this.images[index].data;
	}

	onFileAdded(files: Array<File>) {
		debugger;
		files.forEach(async file => {
			const image = await AppImage.newInstance(file, this.userSrv.userId);
			this.addImage.emit(image);
		});
	}
}
