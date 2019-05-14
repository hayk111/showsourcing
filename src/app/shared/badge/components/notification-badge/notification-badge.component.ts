import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';

@Component({
	selector: 'notification-badge-app',
	templateUrl: './notification-badge.component.html',
	styleUrls: ['./notification-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationBadgeComponent implements OnInit {

	@ViewChild('notification') notification: TemplateRef<any>;

	constructor() { }

	ngOnInit() {
	}

}
