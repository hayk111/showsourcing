import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'notif-app',
	templateUrl: './notif.component.html',
	styleUrls: ['./notif.component.scss']
})
export class NotifComponent implements OnInit {

	isOpen = false;
	fullScreen = false;

	constructor() { }

	ngOnInit() {
	}

	open() {
		this.isOpen = true;
	}

	close() {
		this.isOpen = false;
		this.fullScreen = false;
	}

	makeFullScreen() {
		this.fullScreen = true;
	}

}
