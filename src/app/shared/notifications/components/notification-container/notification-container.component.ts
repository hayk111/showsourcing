import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../model/notification.interface';

// container component to show notifications
@Component({
	selector: 'notification-container-app',
	templateUrl: './notification-container.component.html',
	styleUrls: ['./notification-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationContainerComponent implements OnInit {
	notifications$;
	notifications: Array<Notification> = [];
	@Input() limit = 5;
	@Input() defaultTimeout = 5000;

	constructor(private srv: NotificationService) {}

	ngOnInit() {
		this.notifications$ = this.srv.notifications$;
		this.notifications$.subscribe((notif: Notification) => this.add(notif));
	}

	private add(notif: Notification) {
		this.notifications.push(notif);
		if (this.isLimitExceeded()) {
			this.notifications.shift();
		}
		setTimeout(() => this.removeNotification(notif.id), notif.timeout || this.defaultTimeout);
	}

	private removeNotification(id: number) {
		debugger;
		this.notifications = this.notifications.filter(notif => notif.id !== id);
	}

	private isLimitExceeded() {
		return this.notifications.length >= this.limit;
	}
}
