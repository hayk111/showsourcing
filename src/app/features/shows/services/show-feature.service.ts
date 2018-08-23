import { Injectable } from '@angular/core';
import { ShowService, EventService, SupplierService } from '~global-services';
import {  GLOBAL_DATA_CLIENT } from '~shared/apollo';
import { SelectParams } from '~global-services/_global/select-params';
import { Observable, of } from 'rxjs';
import { combineLatest, switchMap, tap, map } from 'rxjs/operators';
import { Filter, FilterType } from '~shared/filters';
import { ShowsModule } from '~features/shows/shows.module';
import { Show } from '~models/show.model';

@Injectable({
  providedIn: 'root'
})
export class ShowFeatureService extends ShowService {
  constructor(
    apollo: Apollo,
    protected eventSrv: EventService,
    protected supplierSrv: SupplierService
  ) {
    super(apollo);
  }

  selectOne(id: string) {
    return super.selectOne(id).pipe(
      // we need to check if the team has saved this event on their realm
      switchMap(
        (show) => this.eventSrv.selectOne(id),
        (show, event) => {
          if (event)
            show.saved = true;
          return show;
        }
      )
    );
  }

  // we want to actually replace the show with an event on team realm if it's one from team realm
  // if they exist
  selectInfiniteListAllShows(params$: Observable<SelectParams>): Observable<Show[]> {
    // const { items$ } = super.selectInfiniteList(params$)
    // return items$.pipe(
    //   switchMap(
    //     shows => {
    //       const filters: Filter[] = shows.map(show => ({ type: FilterType.ID, value: show.id }));
    //       return this.eventSrv.selectMany(of(new SelectParams({ query: FilterService.filtersToQuery(filters) })))
    //     }, (shows, events) => {
    //       // making a map of events for easy access
    //       const eventMap = new Map();
    //       events.forEach(evt => eventMap.set(evt.id, event));
    //       // replacing shows if they exist in the event map
    //       return shows.map(show => eventMap.has(show.id) ? { ...show, saved: true } : show);
    //     })
    // )
    throw Error('to refactor')
  }

  // this gets the list of events of the team then with the id we receive query backs the global db
  selectInfiniteListMyShows(params$: Observable<SelectParams>): Observable<any[]> {
    // // we return the events from team realm directly
    // const { items$ } = this.eventSrv.selectInfiniteList(params$)
    // return items$.pipe(
    //   tap(events => events = events.map(evt => ({ ...evt, saved: true })))
    // );
    throw Error('to refactor')
  }

  // this will save the show on team realm
  saveShow(show: Show) {
    // we need to save the correct infos
    return this.eventSrv.create(show as any);
  }

  // so we get the suppliers from the shows then we change the suppliers with the one from
  // team realm if they exist
  selectBooths(params$: Observable<SelectParams>) {

  }

}
