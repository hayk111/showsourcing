import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GetStreamNotification } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { NotificationActivityService } from '~shared/notif/services/notification-activity.service';
import { Subscription } from 'apollo-client/util/Observable';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'notif-app',
	templateUrl: './notif.component.html',
	styleUrls: ['./notif.component.scss'],

})
export class NotifComponent extends AutoUnsub implements OnInit {
	@Input() notifications: GetStreamNotification = null;

	notificationsMarkedAsReadSubscription: Subscription;

	constructor(public notifActivitySrv: NotificationActivityService) {
		super();
	 }

	ngOnInit() {
		this.notificationsMarkedAsReadSubscription = this.notifActivitySrv.getMarkAsReadNotifications()
			.subscribe(({allMarkedAsRead}) => {
				if (allMarkedAsRead) {
					return this.notifications.unread = 0;
				}
				this.notifications.unread--;
			});
	}

	openPanel() {
		this.notifActivitySrv.openNotificationPanel();
	}

	closePanel() {
		this.notifActivitySrv.closeNotificationPanel();
	}

}
