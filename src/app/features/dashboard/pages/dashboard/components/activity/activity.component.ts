import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupedActivityFeed } from '~common/activity/interfaces/client-feed.interfaces';

@Component({
	selector: 'dashboard-activity-app',
	templateUrl: './activity.component.html',
	styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
	@Input() feedResult: GroupedActivityFeed;
	@Output() openPreview = new EventEmitter<any>();

	constructor() { }

	ngOnInit() { }
}
