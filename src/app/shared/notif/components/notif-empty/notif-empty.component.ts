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
	constructor(public router: Router, private notifActivitySrv: NotificationActivityService) { }

	ngOnInit() { }

	redirect() {
		this.notifActivitySrv.closeNotifiactionPanel();
		this.router.navigate(['/settings/team/members']);
	}
}
