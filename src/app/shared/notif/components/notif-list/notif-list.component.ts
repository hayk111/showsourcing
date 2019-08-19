import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { GetStreamGroup } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { NotificationActivityService } from '~shared/notif/services/notification-activity.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'notif-list-app',
	templateUrl: './notif-list.component.html',
	styleUrls: ['./notif-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class NotifListComponent implements OnInit, OnDestroy {

	@Input() activites: GetStreamGroup[] = [];
	@Input() isDashboardBox = false;

	@Output() close = new EventEmitter<void>();

	notifiactionsMarkedAsReadSubscription: Subscription;
	constructor(private notifActivitySrv: NotificationActivityService, private changeDetRef: ChangeDetectorRef) {
	}


	ngOnInit() {
		this.notifiactionsMarkedAsReadSubscription = this.notifActivitySrv.getMarkAsReadNotifiactions()
			.subscribe(({ allMarkedAsRead, notificationId }) => {
				if (allMarkedAsRead) {
					return this.markAllAsRead();
				}
				this.markAsRead(notificationId);
			});
	}

	markAllAsRead() {
		this.activites = this.activites.map(activity => { activity.is_read = true; return activity; });
		this.changeDetRef.detectChanges();
	}

	markAsRead(notifiactionId: string) {
		this.activites.find(activity => activity.id === notifiactionId).is_read = true;
		this.changeDetRef.detectChanges();
	}

	ngOnDestroy() {
		this.notifiactionsMarkedAsReadSubscription.unsubscribe();
	}

}
