import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import * as getstream from 'getstream';
import { BehaviorSubject, from, Observable, ReplaySubject, of } from 'rxjs';
import { first, map, mergeScan, scan, shareReplay, switchMap, takeWhile } from 'rxjs/operators';
import { TokenService } from '~core/auth';
import { TokenState } from '~core/auth/interfaces/token-state.interface';
import { TeamService } from '~entity-services';
import { ActivityFeed, GroupedActivityFeed } from '~common/activity/interfaces/client-feed.interfaces';
import {
	GetStreamActivity,
	GetStreamGroup,
	GetStreamResponse,
} from '~common/activity/interfaces/get-stream-feed.interfaces';


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
		private teamSrv: TeamService,
		private tokenSrv: TokenService
	) {
		this.client = getstream.connect(environment.getStreamKey, null, '39385');
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

		const _token$ = this.getToken(tokenUrl).pipe(first());

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
		debugger;
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
		return this.tokenSrv.jwtTokenFeed$.pipe(
			switchMap((token: TokenState) => {
				const headers = new HttpHeaders({ Authorization: token.token });
				return this.http.get<TokenResponse>(url, { headers });
			}),
			map((resp: TokenResponse) => resp.token),
			first()
		);
	}


}
