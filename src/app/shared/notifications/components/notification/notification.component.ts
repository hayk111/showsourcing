import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NotificationType } from '~app/shared/notifications/model/notification.interface';

@Component({
	selector: 'notification-app',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnInit {
	@Input() type: NotificationType;
	@Input() title: string;
	@Input() message: string;

	constructor() {}

	ngOnInit() {}
}
