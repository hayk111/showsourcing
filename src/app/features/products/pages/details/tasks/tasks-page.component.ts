import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, takeUntil, tap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { FilterService } from '~core/filters';
import { ListHelper2Service, ListPageViewService, SelectionService } from '~core/list-page2';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { api } from 'showsourcing-api-lib';

@Component({
	selector: 'tasks-page-app',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListHelper2Service,
		SelectionService,
		FilterService,
		ListPageViewService
	]
})
export class TasksPageComponent extends AutoUnsub implements OnInit {
	productId: string;

	constructor(
		protected route: ActivatedRoute,
		protected router: Router,
		public dialogCommonSrv: DialogCommonService,
		public listHelper: ListHelper2Service,
		public selectionSrv: SelectionService,
		public filterSrv: FilterService,
		public viewSrv: ListPageViewService<any>
	) {
		super();
	}

	ngOnInit() {
		this.productId = this.route.parent.snapshot.params.id;

		this.listHelper.setup(
			'Task',
			this._destroy$,
			(options) => api.Task.findByProduct$(this.productId)
		);
	}
}
