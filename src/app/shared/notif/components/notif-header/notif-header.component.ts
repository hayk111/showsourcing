import {
	Component,
	OnInit,
	EventEmitter,
	Output
} from '@angular/core';
import { NotificationActivityService } from '~shared/notif/services/notification-activity.service';

@Component({
	selector: 'notif-header-app',
	templateUrl: './notif-header.component.html',
	styleUrls: ['./notif-header.component.scss'],
})
export class NotifHeaderComponent implements OnInit {

	constructor(public notifActivitySrv: NotificationActivityService) { }

	ngOnInit() { }
}
