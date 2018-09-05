import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { GetStreamActivity } from '~shared/activity/interfaces/get-stream-feed.interfaces';

@Component({
	selector: 'app-flat-feed-list',
	templateUrl: './flat-feed-list.component.html',
	styleUrls: ['./flat-feed-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlatFeedListComponent implements OnInit {
	@Input() activities: GetStreamActivity[];

	constructor() { }

	ngOnInit() {
	}

}
