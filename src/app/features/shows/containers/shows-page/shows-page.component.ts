import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { ListPageService } from '~core/list-page';
import { ShowFeatureService } from '~features/shows/services/show-feature.service';
import { Show } from '~models';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'shows-page-app',
	templateUrl: './shows-page.component.html',
	styleUrls: ['./shows-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
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
		private featureSrv: ShowFeatureService,
		public listSrv: ListPageService<Show, ShowFeatureService>,
		public commonDlgSrv: CommonDialogService
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
		//   this.filterSrv.upsertFilter({ type: 'description.endDate', comparator: '>', value: toRealmDateFormat(now) });
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
