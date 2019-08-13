import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'notif-app',
	templateUrl: './notif.component.html',
	styleUrls: ['./notif.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class NotifComponent implements OnInit {
	leftSideOrientation = false;
	isOpen = false;
	@Input() notifications: any = null;
	constructor() { }

	ngOnInit() {
	}

	open() {
		this.isOpen = true;
	}

	close() {
		this.isOpen = false;
	}

}
