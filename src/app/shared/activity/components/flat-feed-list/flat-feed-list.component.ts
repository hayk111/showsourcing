import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product, Supplier, EntityMetadata } from '~models';
import { ActivityFeed } from '~shared/activity/interfaces/client-feed.interfaces';
import { GetStreamActivity } from '~shared/activity/interfaces/get-stream-feed.interfaces';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';

@Component({
	selector: 'flat-feed-list-app',
	templateUrl: './flat-feed-list.component.html',
	styleUrls: ['./flat-feed-list.component.scss'],
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
