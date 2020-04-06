import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges,
	Output, TemplateRef, ChangeDetectorRef, OnInit } from '@angular/core';
import { DEFAULT_TAKE_PAGINATION } from '~core/erm';
import { TrackingComponent } from '~utils';
import { PaginationService } from '~shared/pagination/services/pagination.service';
import { combineLatest } from 'rxjs';

@Component({
	selector: 'pagination-app',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.side-padding-l]': 'hasSidePadding',
		'[class.mg-top-ms]': 'hasTopPadding' // adding margin top only if the element is being shown up
	}
})
export class PaginationComponent extends TrackingComponent implements OnInit {

	/** whether we should show per page items count */
	@Input() hasPageItemsCount = true;
	/** whether the element has left and right padding of 24px */
	@Input() hasSidePadding = false;
	@Input() hasTopPadding = true;
	currentPage = 0;
	range: number[] = [];
	perPageItemCount: number[] = [25, 50, 100, 200];

	constructor(
		public paginationSrv: PaginationService,
		private cdr: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		combineLatest(
			this.paginationSrv.page$,
			this.paginationSrv.range$
		).subscribe(([page, range]) => {
			this.currentPage = page;
			this.range = range;
			this.cdr.markForCheck();
		});
	}
}
