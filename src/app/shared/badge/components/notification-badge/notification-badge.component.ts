import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'notification-badge-app',
	templateUrl: './notification-badge.component.html',
	styleUrls: ['./notification-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationBadgeComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
