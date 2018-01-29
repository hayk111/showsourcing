import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppFile } from '../../../../store/model/entities/app-file.model';
import { AppImage } from '../../../../store/model/entities/app-image.model';

@Component({
	selector: 'img-preview-app',
	templateUrl: './img-preview.component.html',
	styleUrls: ['./img-preview.component.scss']
})
export class ImgPreviewComponent implements OnInit {
	@Input() images: Array<AppImage> = [];
	@Output() imageClicked = new EventEmitter<AppFile>();

	constructor() { }

	ngOnInit() {
	}

	onClick(index) {
		this.imageClicked.emit(this.images[index]);
	}

}
