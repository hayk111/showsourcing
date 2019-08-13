import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { GetStreamActivity } from '~common/activity/interfaces/get-stream-feed.interfaces';

@Component({
	selector: 'notif-list-app',
	templateUrl: './notif-list.component.html',
	styleUrls: ['./notif-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class NotifListComponent implements OnInit {

	@Input() activites: GetStreamActivity[] = [];
	@Output() close = new EventEmitter<void>();
	constructor() {
	}

	ngOnInit() {
		setTimeout(() => console.log('list', this.activites), 9000 );

	}

}
