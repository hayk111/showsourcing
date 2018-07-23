import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NotificationService } from '~shared/notifications/services/notification.service';
import { Notification } from '~shared/notifications/model/notification.interface';
import { Observable } from 'rxjs';

// container component to show notifications
@Component({
	selector: 'notification-container-app',
	templateUrl: './notification-container.component.html',
	styleUrls: ['./notification-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationContainerComponent implements OnInit {
	notifications$: Observable<Array<Notification>>;

	constructor(private srv: NotificationService) { }

	ngOnInit() {
		this.notifications$ = this.srv.notifications$;
	}

}
