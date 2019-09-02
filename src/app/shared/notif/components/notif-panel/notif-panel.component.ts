import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { GetStreamGroup } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { NotificationActivityService } from '~shared/notif/services/notification-activity.service';

import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
	selector: 'notif-panel-app',
	templateUrl: './notif-panel.component.html',
	styleUrls: ['./notif-panel.component.scss'],
	animations: [
		trigger('paneAnimationTrigger', [
			state('void', style({
				transform: 'translateX(-100%)',
			})),
			transition('* => void', [
				animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))
			]),
			transition('void => *', [
				animate('300ms ease-in', style({ transform: 'translateX(0)' }))
			]),
		]),
	]
})
export class NotifPanelComponent implements OnInit {
	@Input() results: GetStreamGroup[] = null;
	@Output() startAnimation = new EventEmitter<void>();
	@Output() endAnimation = new EventEmitter<void>();

	constructor(public notifActivitySrv: NotificationActivityService) {}

	ngOnInit() {
	}

}
