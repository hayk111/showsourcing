import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { GetStreamGroup } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { NotificationActivityService } from '~shared/notif/services/notification-activity.service';

@Component({
	selector: 'notif-panel-app',
	templateUrl: './notif-panel.component.html',
	styleUrls: ['./notif-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotifPanelComponent implements OnInit {
	@Input() results: GetStreamGroup[] = null;

	constructor(public notifActivitySrv: NotificationActivityService) {}

	ngOnInit() {
	}

}
