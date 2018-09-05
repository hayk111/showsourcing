import { Observable } from 'rxjs';
import { GetStreamActivity, GetStreamGroup } from '~shared/activity/interfaces/get-stream-feed.interfaces';


export interface GroupedActivityFeed {
	feed$: Observable<GetStreamGroup[]>;
	loadMore: any;
}

export interface ActivityFeed {
	feed$: Observable<GetStreamActivity[]>;
	loadMore: any;
}

