import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';
import { Export } from '~core/erm3/models';
import { FilterService } from '~core/filters';
import { SelectionService, ListHelper2Service } from '~core/list-page2';
import { PaginationService } from '~shared/pagination/services/pagination.service';
import { SortService } from '~shared/table/services/sort.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'exports-page-app',
	templateUrl: './exports-page.component.html',
	styleUrls: ['./exports-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'table-page'
	},
	providers: [
		ListHelper2Service, SelectionService, SortService, PaginationService, FilterService
	]
})
export class ExportsPageComponent extends AutoUnsub
	implements OnInit, AfterViewInit {
	// selectItemsConfig: SelectParamsConfig;

	constructor(
		public listHelper: ListHelper2Service,
		private filterSrv: FilterService,
		private selectionSrv: SelectionService
	) {
		super();
	}

	ngOnInit() {
		this.filterSrv.setup([], [
			// 'format',
			'status',
			'createdBy.firstName',
			'createdBy.lastName'
		]);

		// this.listHelper.setup('Export');
	}

	ngAfterViewInit() {
		// we need this refetch on after view init, otherwise if we come from the redirection of the
		// export-dlg.component we won't see the new request created
		// this.listHelper.refetch();
	}

	downloadOne(exportReq: Export) {
		// if (exportReq && exportReq.status === 'READY')
		// // Download
			// this.exportSrv.retrieveFile(exportReq).subscribe(({ file, name }) => {
			// 	saveAs(file, name);
			// });
	}

	downloadSelected() {
		this.selectionSrv.selection.forEach((exportReq: any) => {
			this.downloadOne(exportReq);
		});
	}

	showItemsPerPage(count: number) {
		// this.selectItemsConfig = { take: Number(count) };
		// this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

	toggleMyExports(show: boolean) {
		if (show) {
			// this.filterSrv.addFilter(filterMyExports);
			return;
		}

		// this.filterSrv.removeFilter(filterMyExports);
	}
}
