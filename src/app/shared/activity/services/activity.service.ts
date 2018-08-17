import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as stream from 'getstream';
import { forkJoin, Observable, ReplaySubject } from 'rxjs';
import { first, map, scan, switchMap, tap } from 'rxjs/operators';
import { ProductService } from '~global-services';


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



@Injectable({
	providedIn: 'root'
})
export class ActivityService {

	private client: any;
	private token$ = new ReplaySubject(1);

	constructor(
		private http: HttpClient,
		private productSrv: ProductService
	) {
		this.client = stream.connect('7mxs7fsf47nu', null, '39385');
		this.getToken();
	}

	/**
   * Gets the dashboard activity
   */
	getDashboardActivity(page$: Observable<number>) {
		const teamId = '2a0ac87c-e1a8-4912-9c0d-2748a4aa9e46';
		// gets feed token
		return this.token$.pipe(
			// once we have the token we can get a feed
			switchMap(({ token }: any) => this.getActivityStream(page$, this.client, teamId, token)),
			tap((r: any) => this.addData(r.results)),
			map(r => r.results),
			scan((pre, curr) => ([...pre, ...curr]), [])
		);
	}

	getProductDetailsActivity(page$: Observable<number>) {

	}

	private getToken() {
		const teamId = '2a0ac87c-e1a8-4912-9c0d-2748a4aa9e46';
		this.http.get<GetStreamResponse>(`https://murmuring-sierra-85015.herokuapp.com/${teamId}`)
			.subscribe(this.token$);
	}

	private getActivityStream(page$, client, teamId, token) {
		return page$.pipe(
			switchMap((page: number) => {
				const teamStream = client.feed('team', teamId, token);
				// TODO : we use offset but it isn't recommended, we should use id_lt
				return teamStream.get({ limit: 15, offset: page * 15 });
			})
		);
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
		results.forEach(res => {
			res.obs = forkJoin(res.activities.map(act => this.addDataToActivity(act)));
		});
	}

	private addDataToActivity(activity: GetStreamActivity) {
		switch (activity.verb) {
			case 'update_product':
			case 'create_product':
				return this.productSrv.selectOne(activity.object).pipe(first());
		}
	}

	private getLastUuid(feeds: GetStreamResult[]) {
		const lastIndex = feeds.length - 1;
		const lastActivities = feeds[lastIndex].activities;
		return lastActivities[lastActivities.length - 1].id;
	}
}
