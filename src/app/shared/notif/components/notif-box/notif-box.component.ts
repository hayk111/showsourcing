import {
	Component,
	OnInit,
} from '@angular/core';
import { GetStreamNotification } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { ActivityService } from '~common/activity/services/activity.service';
import { Observable } from 'rxjs';


@Component({
	selector: 'notif-box-app',
	templateUrl: './notif-box.component.html',
	styleUrls: ['./notif-box.component.scss'],
})
export class NotifBoxComponent implements OnInit {
	notifications$: Observable<GetStreamNotification>;
	constructor(private activitySrv: ActivityService) { }

	ngOnInit() {
		this.notifications$ = this.activitySrv.getNotifications();
	}
}
