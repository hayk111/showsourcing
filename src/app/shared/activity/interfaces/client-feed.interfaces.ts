import { Observable } from 'rxjs';
import { GetStreamActivity, GetStreamGroup } from '~shared/activity/interfaces/get-stream-feed.interfaces';


export interface GroupedActivityFeed {
	feed$: Observable<GetStreamActivity[]>;
	loadMore: any;
}

export interface ActivityFeed {
	feed$: Observable<GetStreamGroup[]>;
	loadMore: any;
}


