import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ShowService, UserService } from '~global-services';
import { SelectParams } from '~global-services/_global/select-params';
import { of } from 'rxjs';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { Show } from '~models/show.model';
import { Router } from '@angular/router';
import { first, tap, takeUntil, switchMap } from 'rxjs/operators';
import { FilterService } from '~shared/filters/services/filter.service';
import { StoreKey } from '~utils/store/store';
import { realmDateFormat } from '~utils/realm-date-format.util';

@Component({
  selector: 'shows-page-app',
  templateUrl: './shows-page.component.html',
  styleUrls: ['./shows-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    FilterService,
    { provide: 'storeKey', useValue: StoreKey.FILTER_SUPPLIER },
  ]
})
export class ShowsPageComponent extends ListPageComponent<Show, ShowService> implements OnInit {

  currentParams = new SelectParams({ take: 10, sort: { sortBy: 'description.startDate', sortOrder: 'DESC' } });
  checkboxes = {
    futureShowOnly: false,
    myShows: false
  };

  constructor(
    protected router: Router,
    protected srv: ShowService,
    protected filterSrv: FilterService,
    protected userSrv: UserService
  ) {
    super(router, srv, undefined, filterSrv);
  }

  /** init */
  ngOnInit() {
    // overriding onInit to remove setSelection since we don't use any selection here
    this.togglePastEvents();
    this.setFilters();
    this.setItems();
  }

  setItems() {
    this.items$ = this.selectParams$.pipe(
      takeUntil(this._destroy$),
      tap(params => this.currentParams = params),
      tap(_ => this.onLoad()),
      switchMap(param$ => this.featureSrv.selectInfiniteList(this.selectParams$)),
      tap(() => this.onLoaded()),
    );
  }


  toggleMyEvents() {
    //this.filterSrv.addFilter({ raw: `description.createdBy.id == "${this.userSrv.userSync.id}"` });
    this.checkboxes.myShows = !this.checkboxes.myShows;
  }

  togglePastEvents() {
    const now = new Date();
    this.checkboxes.futureShowOnly = !this.checkboxes.futureShowOnly;
    if (this.checkboxes.futureShowOnly) {
      this.filterSrv.upsertFilter({ type: 'description.endDate', comparator: '>', value: realmDateFormat(now) });
    } else {
      this.filterSrv.removeFilterType('description.endDate');
    }
  }

}
