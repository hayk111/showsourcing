import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'notif-item-app',
	templateUrl: './notif-item.component.html',
	styleUrls: ['./notif-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotifItemComponent implements OnInit {

	@Input() notification: any = null;

	constructor() {
	}

	ngOnInit() {

	}

}
