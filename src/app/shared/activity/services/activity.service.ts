import { Injectable } from '@angular/core';
import * as stream from 'getstream'
import { HttpClient } from '@angular/common/http';
import { switchMap, map, take, first, tap, scan } from 'rxjs/operators';
import { from, forkJoin } from 'rxjs';
import { ProductService } from '~global-services';
import { Observable } from 'rxjs';
import { preserveWhitespacesDefault } from '../../../../../node_modules/@angular/compiler';
import { access } from 'fs';


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

  constructor(
    private http: HttpClient,
    private productSrv: ProductService
  ) { }


  init() {

  }

  /**
   * Gets the dashboard activity
   */
  getDashboardActivity(selectParams$: Observable<GetStreamResult[]>) {
    const teamId = '2a0ac87c-e1a8-4912-9c0d-2748a4aa9e46';
    const client = stream.connect('mvufdhfnfz83', null, '39385');
    // gets feed token
    return selectParams$.pipe(
      tap(d => { debugger; }),
      switchMap(feed => this.http.get<GetStreamResponse>(`https://murmuring-sierra-85015.herokuapp.com/${teamId}`).pipe(
        // once we have the token we can get a feed
        switchMap(({ token }: any) => {
          const teamStream = client.feed('team', teamId, token);
          // so we are using the current feed (at the start it's an empty array)
          // to determine what is the last id we need
          return teamStream.get({ limit: 15, id_lt: feed.length > 0 ? this.getLastUuid(feed) : undefined });
        }),
        // since a feed only has ids we need to select items in the db and add those to the feed
        tap((r: any) => this.addData(r.results))
      )),
      map(r => r.results),
      scan((pre, curr) => ([...pre, ...curr]), [])
    );
  }

  loadMore(feed: GetStreamResponse) {
    return this.http.get('https://api.stream-io-api.com' + feed.next).pipe(
      tap((r: any) => this.addData(r.results))
    );
  }

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
