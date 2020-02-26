import {
	Component,
	OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { NotificationActivityService } from '~shared/notif/services/notification-activity.service';


@Component({
	selector: 'notif-empty-app',
	templateUrl: './notif-empty.component.html',
	styleUrls: ['./notif-empty.component.scss'],
})
export class NotifEmptyComponent implements OnInit {
	constructor(
		private notifActivitySrv: NotificationActivityService,
		private router: Router,
	) { }

	ngOnInit() { }

	redirect() {
		this.notifActivitySrv.closeNotificationPanel();
		this.router.navigate(['/settings/team/members']);
	}
}
