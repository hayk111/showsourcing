import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { GetStreamGroup } from '~common/activity/interfaces/get-stream-feed.interfaces';

@Component({
	selector: 'notif-panel-app',
	templateUrl: './notif-panel.component.html',
	styleUrls: ['./notif-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotifPanelComponent implements OnInit {
	@Output() close = new EventEmitter<void>();
	@Input() results: GetStreamGroup[] = null;

	constructor() {}

	ngOnInit() {
		console.log(this.results);
	}

}
