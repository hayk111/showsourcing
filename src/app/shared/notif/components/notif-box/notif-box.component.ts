import {
	Component,
	OnInit,
} from '@angular/core';
import { GetStreamNotification } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { Observable } from 'rxjs';
import { NotificationActivityService } from '~shared/notif/services/notification-activity.service';


@Component({
	selector: 'notif-box-app',
	templateUrl: './notif-box.component.html',
	styleUrls: ['./notif-box.component.scss'],
})
export class NotifBoxComponent implements OnInit {
	notifications$: Observable<GetStreamNotification>;
	constructor(private notifActivitySrv: NotificationActivityService) { }

	ngOnInit() {
		this.notifications$ = this.notifActivitySrv.getNotifications();
	}
}
