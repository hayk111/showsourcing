import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { GetStreamNotification } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { NotificationActivityService } from '~shared/notif/services/notification-activity.service';

@Component({
	selector: 'notif-app',
	templateUrl: './notif.component.html',
	styleUrls: ['./notif.component.scss'],

})
export class NotifComponent implements OnInit {
	leftSideOrientation = false;
	isOpen = false;
	@Input() notifications: GetStreamNotification = null;
	constructor(public notifActivitySrv: NotificationActivityService) { }

	ngOnInit() {
	}

	openPanel() {
		this.notifActivitySrv.openNotificationPanel();
	}

	closePanel() {
		this.notifActivitySrv.closeNotifiactionPanel();
	}

}
