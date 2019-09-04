import {
	Component, OnInit, OnChanges, Input, ChangeDetectionStrategy,
	ChangeDetectorRef, SimpleChanges, HostListener } from '@angular/core';
import { GetStreamGroup } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { NotificationActivityService } from '~shared/notif/services/notification-activity.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'notif-list-app',
	templateUrl: './notif-list.component.html',
	styleUrls: ['./notif-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class NotifListComponent extends AutoUnsub implements OnInit, OnChanges {
	@Input() activities: GetStreamGroup[] = [];
	@Input() isDashboardBox = false;
	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.notifActivitySrv.onWindowResize(event);
	}

	isLoading = false;
	isAllLoaded = false;
	constructor(private notifActivitySrv: NotificationActivityService, private changeDetRef: ChangeDetectorRef) {
		super();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.activities && !changes.activities.isFirstChange()) {
			this.isLoading = false;
			const { previousValue, currentValue } = changes.activities;
			if (previousValue.length === currentValue.length) {
				this.isAllLoaded = true;
			}
		}
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

	loadMore() {
		if (!this.isAllLoaded && !this.isLoading) {
			this.isLoading = true;
			this.notifActivitySrv.loadMore();
		}
	}

}
