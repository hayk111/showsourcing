import { Injectable } from '@angular/core';
import * as stream from 'getStream'
import { HttpClient } from '@angular/common/http';
import { switchMap, map, take, first, tap } from 'rxjs/operators';
import { from, forkJoin } from 'rxjs';
import { ProductService } from '~global-services';
import { Observable } from 'rxjs';


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
  getDashboardActivity() {
    const teamId = '2a0ac87c-e1a8-4912-9c0d-2748a4aa9e46';
    const client = stream.connect('mvufdhfnfz83', null, '39385');
    return this.http.get(`https://murmuring-sierra-85015.herokuapp.com/${teamId}`).pipe(
      switchMap(({ token }: any) => {
        const teamStream = client.feed('team', teamId, token);
        return from(teamStream.get({ limit: 15 }));
      }),
      map((r: any) => r.results),
      tap(results => this.addData(results))
    );
  }

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
}
