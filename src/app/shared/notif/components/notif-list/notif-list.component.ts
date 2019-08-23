import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { GetStreamGroup } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { NotificationActivityService } from '~shared/notif/services/notification-activity.service';
import { Subscription } from 'rxjs';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'notif-list-app',
	templateUrl: './notif-list.component.html',
	styleUrls: ['./notif-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class NotifListComponent extends AutoUnsub implements OnInit  {

	@Input() activities: GetStreamGroup[] = [];
	@Input() isDashboardBox = false;

	constructor(private notifActivitySrv: NotificationActivityService, private changeDetRef: ChangeDetectorRef) {
		super();
	}


	ngOnInit() {
		this.notifActivitySrv.getMarkAsReadNotifications()
			.subscribe(({ allMarkedAsRead, notificationId }) => {
				if (allMarkedAsRead) {
					return this.markAllAsRead();
				}
				this.markAsRead(notificationId);
			});
	}

	markAllAsRead() {
		this.activities = this.activities.map(activity => { activity.is_read = true; return activity; });
		this.changeDetRef.markForCheck();
	}

	markAsRead(notificationId: string) {
		this.activities.find(activity => activity.id === notificationId).is_read = true;
		this.changeDetRef.markForCheck();
	}

}
