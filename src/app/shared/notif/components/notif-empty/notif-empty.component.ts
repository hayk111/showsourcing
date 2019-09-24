import {
	Component,
	OnInit,
} from '@angular/core';

import { NotificationActivityService } from '~shared/notif/services/notification-activity.service';


@Component({
	selector: 'notif-empty-app',
	templateUrl: './notif-empty.component.html',
	styleUrls: ['./notif-empty.component.scss'],
})
export class NotifEmptyComponent implements OnInit {
	constructor(private notifActivitySrv: NotificationActivityService) { }

	ngOnInit() { }

	redirect() {
		this.notifActivitySrv.closeNotificationPanel();
		this.notifActivitySrv.redirect('/settings/team/members');
	}
}
