import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as getstream from 'getstream';
import { forkJoin, Observable, ReplaySubject, BehaviorSubject, combineLatest, from } from 'rxjs';
import { first, map, scan, switchMap, tap, switchMapTo, mapTo, zip } from 'rxjs/operators';
import { ProductService, TeamService, SupplierService } from '~global-services';
import { CommentService } from '~global-services/comment/comment.service';
import { log } from '~utils';
import { environment } from 'environments/environment.prod';
import { TokenService } from '~features/auth';
import { TokenState } from '~features/auth/interfaces/token-state.interface';
import { GetStreamResponse, GetStreamGroup, GetStreamActivity } from '~shared/activity/interfaces/get-stream-feed.interfaces';
import { GroupedActivityFeed, ActivityFeed } from '~shared/activity/interfaces/client-feed.interfaces';


/**
 * The activity service gets a feed from getStream as a GetStreamResponse and
 * transform it into a ActivityFeed or a GroupedActivityFeed.
 */
@Injectable({
	providedIn: 'root'
})
export class ActivityService {
	private readonly LIMIT = 15;
	private client: any;

	constructor(
		private http: HttpClient,
		private teamSrv: TeamService,
		private tokenSrv: TokenService
	) {
		this.client = getstream.connect('7mxs7fsf47nu', null, '39385');
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

		const _previousResult$ = new BehaviorSubject<any[]>([]);
		const _loadMore$ = new BehaviorSubject<undefined>(undefined);
		const loadMore = () => {
			_loadMore$.next(undefined);
		};
		const _token$ = this.getToken(tokenUrl).pipe(first());

		// the token emits once, when it has emitted we wait for load more,
		// when we have one load more emitted we get the previous result,
		// then we get the feed result after that previous result
		const feed$ = combineLatest(_token$, _loadMore$).pipe(
			switchMap(([token]) => _previousResult$.pipe(
				first(),
				map(previous => [token, previous]))
			),
			switchMap(([token, prev]: any) => this.getNextFeedResult(feedName, feedId, token, prev)),
			tap(res => _previousResult$.next(res)),
			scan((pre, curr) => ([...pre, ...curr]), [])
		);

		return { feed$, loadMore };
	}

	private getNextFeedResult(feedName: string, feedId: string, token: string, prev: GetStreamGroup[] | GetStreamActivity[] = [])
		: Observable<GetStreamGroup[] | GetStreamActivity[]> {
		// we have a feedname like team:id but we need to do client.feed('team', 'id');
		const stream = this.client.feed(feedName, feedId, token);
		const id_lt = prev.length > 0 ? prev[prev.length - 1].id : undefined;
		return from(stream.get({ limit: this.LIMIT, id_lt })).pipe(
			map((res: GetStreamResponse) => res.results)
		);
	}

	/** some doc on feed token API in readme next to this file */
	private getToken(url): Observable<string> {
		return this.tokenSrv.refreshToken$.pipe(
			switchMap((token: TokenState) => {
				const headers = new HttpHeaders({ Authorization: token.token });
				return this.http.get<TokenResponse>(url, { headers });
			}),
			map((resp: TokenResponse) => resp.token),
			first()
		);
	}


}
