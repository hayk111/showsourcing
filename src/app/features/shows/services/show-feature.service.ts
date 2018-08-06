import { Injectable } from '@angular/core';
import { ShowService, EventService, SupplierService } from '~global-services';
import { ApolloWrapper } from '~shared/apollo';
import { SelectParams } from '~global-services/_global/select-params';
import { Observable, of } from 'rxjs';
import { combineLatest, switchMap, tap } from 'rxjs/operators';
import { FilterService, Filter, FilterType } from '~shared/filters';
import { ShowsModule } from '~features/shows/shows.module';
import { Show } from '~models/show.model';

@Injectable({
  providedIn: 'root'
})
export class ShowFeatureService extends ShowService {
  constructor(
    wrapper: ApolloWrapper,
    protected eventSrv: EventService,
    protected supplierSrv: SupplierService
  ) {
    super(wrapper);
  }

  // we want to actually replace the show with an event on team realm if it's one from team realm
  // if they exist
  selectInfiniteListAllShows(params$: Observable<SelectParams>): Observable<Show[]> {
    return super.selectInfiniteList(params$).pipe(
      switchMap(
        shows => {
          const filters: Filter[] = shows.map(show => ({ type: FilterType.ID, value: show.id }));
          return this.eventSrv.selectMany(of(new SelectParams({ query: FilterService.filtersToQuery(filters) })))
        }, (shows, events) => {
          // making a map of events for easy access
          const eventMap = new Map();
          events.forEach(evt => eventMap.set(evt.id, event));
          // replacing shows if they exist in the event map
          return shows.map(show => eventMap.has(show.id) ? { ...show, saved: true } : show);
        })
    )
  }

  // this gets the list of events of the team then with the id we receive query backs the global db
  selectInfiniteListMyShows(params$: Observable<SelectParams>): Observable<Show[]> {

    return this.eventSrv.selectInfiniteList(params$).pipe(
      switchMap(
        events => {
          const filters: Filter[] = events.map(event => ({ type: FilterType.ID, value: event.id }));
          // if we get no id then we can't have any events
          if (filters.length === 0)
            return of([]);
          return this.selectMany(
            of(new SelectParams({
              sort: { sortBy: 'description.startDate', sortOrder: 'DESC' },
              query: FilterService.filtersToQuery(filters)
            })));
        })
    );
  }


  // so we get the suppliers from the shows then we change the suppliers with the one from
  // team realm if they exist
  selectSuppliers(params$: Observable<SelectParams>) {

  }


}
