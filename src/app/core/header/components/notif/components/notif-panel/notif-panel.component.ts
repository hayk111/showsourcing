import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { GetStreamActivity } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
	selector: 'notif-panel-app',
	templateUrl: './notif-panel.component.html',
	styleUrls: ['./notif-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotifPanelComponent implements OnInit {
	@Output() close = new EventEmitter<void>();
	@Input() results: GetStreamActivity[] = null;

	constructor() {
	}

	ngOnInit() {
		console.log(this.results);
	}

}
