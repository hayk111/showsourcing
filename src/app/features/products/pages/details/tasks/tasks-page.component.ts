import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, takeUntil, tap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { FilterService } from '~core/filters';
import { ListFuseHelperService, ListPageViewService, SelectionService } from '~core/list-page2';
import { AutoUnsub } from '~utils/auto-unsub.component';

@Component({
	selector: 'tasks-page-app',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListFuseHelperService,
		SelectionService,
		FilterService,
		ListPageViewService
	]
})
export class TasksPageComponent extends AutoUnsub implements OnInit {
	product;
	constructor(
		protected route: ActivatedRoute,
		protected router: Router,
		public dialogCommonSrv: DialogCommonService,
		public listHelper: ListFuseHelperService,
		public selectionSrv: SelectionService,
		public filterSrv: FilterService,
		public viewSrv: ListPageViewService<any>
	) {
		super();
	}

	ngOnInit() {
		this.route.parent.params.pipe(
			map(params => params.id),
			tap(id => this.product = { id }),
			takeUntil(this._destroy$)
		).subscribe(id => this.listHelper.setup('Task', 'Supplier', id ));
	}
}
