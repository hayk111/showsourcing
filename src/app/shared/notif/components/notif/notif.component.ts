import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GetStreamNotification } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { NotificationActivityService } from '~shared/notif/services/notification-activity.service';
import { Subscription } from 'apollo-client/util/Observable';

@Component({
	selector: 'notif-app',
	templateUrl: './notif.component.html',
	styleUrls: ['./notif.component.scss'],

})
export class NotifComponent implements OnInit, OnDestroy {
	@Input() notifications: GetStreamNotification = null;

	notifiactionsMarkedAsReadSubscription: Subscription;

	constructor(public notifActivitySrv: NotificationActivityService) { }

	ngOnInit() {
		this.notifiactionsMarkedAsReadSubscription = this.notifActivitySrv.getMarkAsReadNotifiactions()
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
		this.notifActivitySrv.closeNotifiactionPanel();
	}

	ngOnDestroy() {
		this.notifiactionsMarkedAsReadSubscription.unsubscribe();
	}

}
