import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UploadEvent,  } from 'ngx-file-drop';

@Component({
	selector: 'img-input-app',
	templateUrl: './img-input.component.html',
	styleUrls: ['./img-input.component.scss']
})
export class ImgInputComponent implements OnInit {
	@Input() images: Array<any>;
	@Output() imgsAdded = new EventEmitter();
	style = 'img-file-drop';
	fileHover: boolean;

	constructor() { }

	ngOnInit() {
	}

	onFileOver() {
		this.fileHover = true;
	}

	onFileDrop(event: UploadEvent) {
		const files = event.files.map(f => f.fileEntry);
		this.imgsAdded.emit(files);
		// const reader = new FileReader();

		// reader.onloadend = function (e) {
		// 	// placeholder until image is ready
		// 	self.imgAdded.emit( { id: fileItem.id, data: reader.result, pending: true });
		// };
		// reader.readAsDataURL(fileItem._file);
	}

	onFileLeave() {
		this.fileHover = false;
	}

}
