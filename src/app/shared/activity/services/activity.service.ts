import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as getstream from 'getstream';
import { forkJoin, Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
import { first, map, scan, switchMap, tap } from 'rxjs/operators';
import { ProductService, TeamService } from '~global-services';
import { CommentService } from '~global-services/comment/comment.service';
import { log } from '~utils';
import { environment } from 'environments/environment.prod';
import { TokenService } from '~features/auth';

/** some doc on API in readme next to this file */

export interface GetStreamResponse {
	next: string;
	results: GetStreamResult[];
}

export interface GetStreamResult {
	activities: GetStreamActivity[];
	activity_count: number;
	actor_count: number;
	created_at: Date;
	group: string;
	id: string;
	updated_at: Date;
	verb: string;
	// observable version of objects we need (added by us)
	obs: Observable<any>;
}

export interface GetStreamActivity {
	actor: string;
	foreign_id: string;
	id: string;
	object: string;
	origin: string;
	target: string;
	time: Date;
	verb: string;
}


interface TokenResponse {
	token: string;
	feedName: string;
	feedId: string;
}

export interface GetFeedResult {
	feeds$: Observable<GetStreamResult[]>;
	loadMore: any;
}

@Injectable({
	providedIn: 'root'
})
export class ActivityService {

	private client: any;

	constructor(
		private http: HttpClient,
		private teamSrv: TeamService,
		private productSrv: ProductService,
		private commentSrv: CommentService,
		private tokenSrv: TokenService
	) {
		this.client = getstream.connect('7mxs7fsf47nu', null, '39385');
	}

	getDashboardFeed(): GetFeedResult {
		const teamId = this.teamSrv.selectedTeamSync.id;
		const tokenUrl = `${environment.apiUrl}/feed/token/team/${teamId}`;
		return this.getFeed(tokenUrl);
	}

	getProductFeed(productId: string): GetFeedResult {
		const teamId = this.teamSrv.selectedTeamSync.id;
		const tokenUrl = `/feed/token/team/${teamId}/product/${productId}`;
		return this.getFeed(tokenUrl);
	}

	getSupplierFeed(supplierId: string): GetFeedResult {
		const teamId = this.teamSrv.selectedTeamSync.id;
		const tokenUrl = `/feed/token/team/${teamId}/supplier/${supplierId}`;
		return this.getFeed(tokenUrl);
	}

	/**
	 *
	 * @param page$ : Observable, current page of the stream (used for pagination)
	 * @param feedName : string, feed name we want to data from
	 */
	private getFeed(tokenUrl: string): GetFeedResult {
		const _loadMore$ = new BehaviorSubject<undefined>(undefined);
		const loadMore = () => {
			_loadMore$.next(undefined);
		};

		const feeds$ = _loadMore$.pipe(
			// get back last result for infiniscroll
			scan((pre, curr) => pre, []),
			// get token
			switchMap((lastResult: GetStreamResult[]) => this.getToken(tokenUrl).pipe(
				// once we have the token we can get a feed
				switchMap((resp: TokenResponse) => this.getFeedResult(lastResult, resp.token, resp.feedName)),
				tap((r: any) => this.addData(r.results)),
				map(r => r.results),
				scan((pre, curr) => ([...pre, ...curr]), [])
			))
		);

		return { feeds$, loadMore };
	}

	private getFeedResult(lastResult: GetStreamResult[], token: string, feedName: string): Observable<GetStreamResponse> {
		// we have a feedname like team:id but we need to do client.feed('team', 'id');
		const parts = feedName.split(':');
		const stream = this.client.feed(...parts, token);
		const id_lt = lastResult.length > 0 ? lastResult[lastResult.length - 1].id : undefined;
		return stream.get({ limit: 15, id_lt });
	}

	private getToken(url): Observable<TokenResponse> {
		return this.http.get<TokenResponse>(url);
	}


	/**
   *
   * Selects item in db and add those to feed
   */
	private addData(results: GetStreamResult[]) {
		const activityNames = results.map(res => res.activities.map(act => act.verb));
		results.forEach(res => {
			res.obs = combineLatest(res.activities.map(act => this.addDataToActivity(act)));
		});
	}

	private addDataToActivity(activity: GetStreamActivity) {
		switch (activity.verb) {
			case 'create_comment':
				return this.commentSrv.queryOne(activity.object);
			case 'create_product':
				return this.productSrv.queryOne(activity.object);
			default:
				log.warn('unhandled activity feed verb, search this uuid for more info: c6f3ae2e-a222-11e8-98d0-529269fb1459');
		}
	}

	private getLastUuid(feeds: GetStreamResult[]) {
		const lastIndex = feeds.length - 1;
		const lastActivities = feeds[lastIndex].activities;
		return lastActivities[lastActivities.length - 1].id;
	}
}
