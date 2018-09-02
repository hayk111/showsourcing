import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivityService } from '~shared/activity/services/activity.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'product-activity-app',
	templateUrl: './product-activity.component.html',
	styleUrls: ['./product-activity.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductActivityComponent implements OnInit {

	// feedResult: FeedListResult;

	constructor(private route: ActivatedRoute, private activitySrv: ActivityService) {

	}

	ngOnInit() {
		// this.feedResult = this.activitySrv.getProductFeed(this.route.parent.snapshot.params.id);
	}

}
