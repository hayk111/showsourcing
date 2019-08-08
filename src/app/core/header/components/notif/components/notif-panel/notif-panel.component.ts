import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';

@Component({
	selector: 'notif-panel-app',
	templateUrl: './notif-panel.component.html',
	styleUrls: ['./notif-panel.component.scss'],
})
export class NotifPanelComponent implements OnInit {
	@Output() close = new EventEmitter<void>();

	items = [];

	constructor() {
	}

	ngOnInit() {

	}

}
