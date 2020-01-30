import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import * as getstream from 'getstream';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { first, map, mergeScan, scan, shareReplay, switchMap } from 'rxjs/operators';
import { ActivityFeed, GroupedActivityFeed } from '~common/activity/interfaces/client-feed.interfaces';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { TeamService } from '~core/ORM/services';
import {
	GetStreamActivity,
	GetStreamGroup,
	GetStreamResponse,
} from '~common/activity/interfaces/get-stream-feed.interfaces';
import { TokenResponse } from '../interfaces/token-response.interface';


/**
 * The activity service gets a feed from getStream as a GetStreamResponse and
 * transform it into a ActivityFeed or a GroupedActivityFeed.
 */
@Injectable({
	providedIn: 'root'
})
export class ActivityService {
	private readonly LIMIT = 8;
	private client: any;

	constructor(
		private http: HttpClient,
		private teamSrv: TeamService
	) {
		this.client = getstream.connect(environment.getStreamKey, null, environment.getStreamAppID);
	}

	getDashboardFeed(): GroupedActivityFeed {
		const teamId = this.teamSrv.selectedTeamSync.id;
		const tokenUrl = `${environment.apiUrl}/feed/token/team/${teamId}`;
		return this.getFeed(tokenUrl, 'team', teamId) as GroupedActivityFeed;
	}

	getProductFeed(productId: string): ActivityFeed {
		const teamId = this.teamSrv.selectedTeamSync.id;
		const tokenUrl = `${environment.apiUrl}/feed/token/team/${teamId}/product/${productId}`;
		return this.getFeed(tokenUrl, 'product_flat', productId) as ActivityFeed;
	}

	getSupplierFeed(supplierId: string): ActivityFeed {
		const teamId = this.teamSrv.selectedTeamSync.id;
		const tokenUrl = `${environment.apiUrl}/feed/token/team/${teamId}/supplier/${supplierId}`;
		return this.getFeed(tokenUrl, 'supplier_flat', supplierId) as ActivityFeed;
	}

	/**
	 *
	 * @param page$ : Observable, current page of the stream (used for pagination)
	 * @param feedName : string, feed name we want to data from
	 */
	private getFeed(tokenUrl: string, feedName: string, feedId: string)
		: GroupedActivityFeed | ActivityFeed {

		const _loadMore$ = new BehaviorSubject<undefined>(undefined);
		const loadMore = () => {
			_loadMore$.next(undefined);
		};

		const _token$ = this.getToken(tokenUrl).pipe(
			first(),
		);

		// the token emits once, when it has emitted we wait for load more,
		// when we have one load more emitted we get the previous result,
		// then we get the feed result after that previous result
		const feed$ = _token$.pipe(
			switchMap(token => _loadMore$.pipe(
				mergeScan(prev => this.getNextFeedResult(feedName, feedId, token, prev), undefined, 1),
				scan((pre, curr) => [...pre, ...curr], [])
			)),
			shareReplay(1)
		);

		return { feed$, loadMore };
	}

	private getNextFeedResult(feedName: string, feedId: string, token: string, prev: GetStreamGroup[] | GetStreamActivity[])
		: Observable<GetStreamGroup[] | GetStreamActivity[]> {
		if (prev && prev.length === 0)
			return of([]);
		// we have a feedname like team:id but we need to do client.feed('team', 'id');
		const stream = this.client.feed(feedName, feedId, token);
		// if it's the first call there is prev is an array of 0 elem
		const id_lt = prev ? prev[prev.length - 1].id : undefined;
		return from(stream.get({ limit: this.LIMIT, id_lt })).pipe(
			map((res: GetStreamResponse) => res.results)
		);
	}

	/** some doc on feed token API in readme next to this file */
	private getToken(url): Observable<string> {
		return this.http.get<TokenResponse>(url).pipe(
			map((resp: TokenResponse) => resp.token),
			first()
		);
	}


}
