import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as getstream from 'getstream';
import { forkJoin, Observable, ReplaySubject } from 'rxjs';
import { first, map, scan, switchMap, tap } from 'rxjs/operators';
import { ProductService, TeamService } from '~global-services';
import { CommentService } from '~global-services/comment/comment.service';
import { log } from '~utils';

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


export interface GetFeedParams {
	page$: Observable<number>;
	feedName: string;
	tokenUrl: string;
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
		private commentSrv: CommentService
	) {
		this.client = getstream.connect('7mxs7fsf47nu', null, '39385');
	}

	getDashboardFeed(page$: Observable<number>) {
		const teamId = this.teamSrv.selectedTeamSync.id;
		const tokenUrl = `/feed/token/team/${teamId}`;
		const feedName = `team:${teamId}`;
		return this.getToken(`/feed/token/team/${teamId}`).pipe(
			switchMap(token => this.getFeed({ feedName, page$, tokenUrl }))
		);
	}

	getProductFeed(productId: string, page$: Observable<number>) {
		const teamId = this.teamSrv.selectedTeamSync.id;
		const tokenUrl = `/feed/token/team/${teamId}/product/${productId}`;
		const feedName = `product_flat:${productId}`;
		return this.getToken(`/feed/token/team/${teamId}/product/${productId}`).pipe(
			switchMap(token => this.getFeed({ feedName, page$, tokenUrl }))
		);
	}

	getSupplierFeed(supplierId: string, page$: Observable<number>) {
		const teamId = this.teamSrv.selectedTeamSync.id;
		const tokenUrl = `/feed/token/team/${teamId}/supplier/${supplierId}`;
		const feedName = `supplier_flat:${supplierId}`;
		return this.getToken(`/feed/token/team/${teamId}/supplier/${supplierId}`).pipe(
			switchMap(token => this.getFeed({ feedName, page$, tokenUrl }))
		);
	}

	/**
	 *
	 * @param page$ : Observable, current page of the stream (used for pagination)
	 * @param feedName : string, feed name we want to data from
	 */
	private getFeed({ page$, feedName, tokenUrl }: GetFeedParams) {
		// gets feed token
		return this.getToken(tokenUrl).pipe(
			// once we have the token we can get a feed
			switchMap(({ token }: any) => this.getFeedResult(page$, this.client, token, feedName)),
			tap((r: any) => this.addData(r.results)),
			map(r => r.results),
			scan((pre, curr) => ([...pre, ...curr]), [])
		);
	}

	private getFeedResult(page$, client, token, feedName) {
		return page$.pipe(
			switchMap((page: number) => {
				const stream = client.feed(...feedName, token);
				// TODO : we use offset but it isn't recommended, we should use id_lt
				return stream.get({ limit: 15, offset: page * 15 });
			})
		);
	}

	private getToken(url) {
		return this.http.get<GetStreamResponse>(url);
	}


	// loadMore(feed: GetStreamResponse) {
	// 	return this.http.get('https://api.stream-io-api.com' + feed.next).pipe(
	// 		tap((r: any) => this.addData(r.results))
	// 	);
	// }

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
