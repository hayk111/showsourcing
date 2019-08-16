import {
	Component,
	OnInit,
	EventEmitter,
	Output
} from '@angular/core';
import { ActivityService } from '~common/activity/services/activity.service';

@Component({
	selector: 'notif-header-app',
	templateUrl: './notif-header.component.html',
	styleUrls: ['./notif-header.component.scss'],
})
export class NotifHeaderComponent implements OnInit {
	@Output() close = new EventEmitter<void>();
	@Output() markAllAsRead = new EventEmitter<void>();

	constructor(public activitySrv: ActivityService) { }

	ngOnInit() { }
}
