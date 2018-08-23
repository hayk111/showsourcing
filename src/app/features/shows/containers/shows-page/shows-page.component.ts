import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ShowService, UserService } from '~global-services';
import { SelectParams } from '~global-services/_global/select-params';
import { of } from 'rxjs';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { Show } from '~models/show.model';
import { Router } from '@angular/router';
import { first, tap, takeUntil, switchMap, mergeMap } from 'rxjs/operators';
import { realmDateFormat } from '~utils/realm-date-format.util';
import { ShowFeatureService } from '~features/shows/services/show-feature.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'shows-page-app',
  templateUrl: './shows-page.component.html',
  styleUrls: ['./shows-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
  ]
})
export class ShowsPageComponent extends ListPageComponent<Show, ShowFeatureService> implements OnInit {
  allShows$: Observable<Show[]>;
  myShows$: Observable<Show[]>;

  initialSortBy = 'description.startDate';
  checkboxes = {
    futureShowOnly: false,
    myShows: false
  };

  constructor(
    protected router: Router,
    protected featureSrv: ShowFeatureService,
    protected userSrv: UserService
  ) {
    super(router, featureSrv);
  }

  /** init */
  ngOnInit() {
    // overriding onInit to remove setSelection since we don't use any selection here
    this.togglePastEvents();
    // this.setFilters();
    // this.setItems();
  }

  setItems() {

    // this.selectParams$.pipe(
    //   takeUntil(this._destroy$),
    //   tap(params => this.currentParams = params),
    // ).subscribe(_ => {
    //   this.onLoad();
    // });

    // this.allShows$ = this.featureSrv.selectInfiniteListAllShows(this.selectParams$).pipe(
    //   tap(_ => this.onLoaded())
    // );

    // this.myShows$ = this.featureSrv.selectInfiniteListMyShows(this.selectParams$).pipe(
    //   tap(_ => this.onLoaded())
    // );
  }


  toggleMyEvents() {
    this.checkboxes.myShows = !this.checkboxes.myShows;
  }

  togglePastEvents() {
    // const now = new Date();
    // this.checkboxes.futureShowOnly = !this.checkboxes.futureShowOnly;
    // if (this.checkboxes.futureShowOnly) {
    //   this.filterSrv.upsertFilter({ type: 'description.endDate', comparator: '>', value: realmDateFormat(now) });
    // } else {
    //   this.filterSrv.removeFilterType('description.endDate');
    // }
  }


  search(str: string) {
    // this.filterSrv.upsertFilter({ type: 'description.name', comparator: 'CONTAINS[c]', value: `"${str}"` });
  }

  saveShow(show) {
    this.featureSrv.saveShow(show).subscribe(_ => show.saved = true);
  }
}
