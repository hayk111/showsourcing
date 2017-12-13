import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

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

	onDragOver(event) {
		this.fileHover = true;
		event.preventDefault();
	}

	onFileLeave() {
		this.fileHover = false;
	}

}
