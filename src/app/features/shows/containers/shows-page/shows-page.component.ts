import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ShowService, UserService } from '~global-services';
import { SelectParams } from '~global-services/_global/select-params';
import { of } from 'rxjs';
import { Show, ERM_TOKEN, ERM } from '~models';
import { Router } from '@angular/router';
import { ShowFeatureService } from '~features/shows/services/show-feature.service';
import { Observable } from 'rxjs';

import { TrackingComponent } from '~shared/tracking-component/tracking-component';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { ListPageProviders, ProviderKey } from '~core/list-page/list-page-providers.class';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
@Component({
	selector: 'shows-page-app',
	templateUrl: './shows-page.component.html',
	styleUrls: ['./shows-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageProviders.getProviders(ProviderKey.SHOW, ERM.SHOW),
		CommonDialogService,
		{ provide: ERM_TOKEN, useValue: ERM.SHOW }]
})
export class ShowsPageComponent extends TrackingComponent implements OnInit {
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
		protected userSrv: UserService,
		protected viewSrv: ListPageViewService<Show>,
		public dataSrv: ListPageDataService<Show, ShowFeatureService>,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService
	) {
		super();
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
