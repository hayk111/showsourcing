import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product, Supplier, EntityMetadata } from '~models';
import { ActivityFeed } from '~common/activity/interfaces/client-feed.interfaces';
import { GetStreamActivity } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'activity-list-app',
	templateUrl: './activity-list.component.html',
	styleUrls: ['./activity-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlatFeedListComponent extends TrackingComponent implements OnInit {

	@Input() entity: Product | Supplier;
	@Input() activities: GetStreamActivity[];
	@Input() typeEntity: EntityMetadata;

	constructor() {
		super();
	}

	ngOnInit() {
	}

}

/*
Using in :
- product-activity
- supplier-activity

*/
