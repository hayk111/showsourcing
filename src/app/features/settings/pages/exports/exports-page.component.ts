import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';
import { first } from 'rxjs/operators';
import { SelectionService, ListHelperService } from '~core/list-page2';
import { FilterService, FilterType } from '~core/filters';
import { AutoUnsub } from '~utils';
import { Export } from '~core/erm3/models';
import { PaginationService } from '~shared/pagination/services/pagination.service';
import { SortService } from '~shared/table/services/sort.service';

@Component({
	selector: 'exports-page-app',
	templateUrl: './exports-page.component.html',
	styleUrls: ['./exports-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'table-page'
	},
	providers: [
		ListHelperService, SelectionService, SortService, PaginationService, FilterService
	]
})
export class ExportsPageComponent extends AutoUnsub
	implements OnInit, AfterViewInit {
	// selectItemsConfig: SelectParamsConfig;

	constructor(
		public listHelper: ListHelperService<Export>,
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
