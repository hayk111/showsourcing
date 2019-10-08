import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { NotificationType } from '~shared/notifications/model/notification.interface';
import { NotificationService } from '~shared/notifications/services/notification.service';

@Component({
	selector: 'notification-app',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnInit {

	public iconLeft = '';

	@Input() id = null;

	private _type: NotificationType;
	@Input() set type(value: NotificationType) {
		this._type = value;
		switch (value) {
			case NotificationType.ERROR: {
				this.iconLeft = 'times';
				break;
			}
			case NotificationType.DANGER:
			case NotificationType.WARNING:
			case NotificationType.SUCCESS:
			case NotificationType.DELETED: {
				this.iconLeft = 'check';
				break;
			}
		}
	}
	get type() {
		return this._type;
	}

	@Input() title: string;
	@Input() message: string;
	@Input() actionMessage: string;
	@Input() action: Observable<any>;

	public NotificationType = NotificationType;

	constructor(
		protected notifSrv: NotificationService
	) { }

	ngOnInit() { }

	forceClose() {
		this.notifSrv.removeNotification(this.id);
	}

	onActionClick() {
		this.action.subscribe(({ file, name }) => saveAs(file, name));
	}
}
