import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { GetStreamNotification } from '~common/activity/interfaces/get-stream-feed.interfaces';

@Component({
	selector: 'notif-app',
	templateUrl: './notif.component.html',
	styleUrls: ['./notif.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class NotifComponent implements OnInit {
	leftSideOrientation = false;
	isOpen = false;
	@Input() notifications: GetStreamNotification = null;
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
