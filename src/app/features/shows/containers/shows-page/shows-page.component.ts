import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ShowService } from '~global-services';
import { SelectParams } from '~global-services/_global/select-params';
import { of } from 'rxjs';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { Show } from '~models/show.model';
import { Router } from '@angular/router';
import { first } from '../../../../../../node_modules/rxjs/operators';
import { FilterService } from '~shared/filters/services/filter.service';
import { StoreKey } from '~utils/store/store';

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
  currentParams = new SelectParams({ sort: { sortBy: 'description.startDate', sortOrder: 'DESC' } });
  constructor(
    protected router: Router,
    protected srv: ShowService,
    protected filterSrv: FilterService,
  ) {
    super(router, srv, undefined, filterSrv);
  }

  /** init */
  ngOnInit() {
    this.setItems();
    this.setFilters();
  }
}
