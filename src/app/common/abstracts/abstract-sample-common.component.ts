import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { SampleCreationDialogComponent } from '~common/dialogs/creation-dialogs';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { UserService } from '~core/auth';
import { Product, Supplier } from '~core/erm3/models';
import { ApiService } from '~core/erm3/services/api.service';
import { Filter, FilterService, FilterType } from '~core/filters';
import { ListHelperService } from '~core/list-page2';
import { CloseEvent, CloseEventType, DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils/auto-unsub.component';

/** @deprecated */
/** since we use the sample component on different pages, this page will keep the methods clean */
export abstract class AbstractSampleCommonComponent extends AutoUnsub
	implements OnInit {
	public trackById = (index, item) => item.id;

	constructor(
		protected router: Router,
		protected route: ActivatedRoute,
		protected userSrv: UserService,
		protected apiSrv: ApiService,
		protected dlgSrv: DialogService,
		public listHelper: ListHelperService,
		public dlgCommonSrv: DialogCommonService,
		protected filterSrv: FilterService
	) {
		super();
	}

	ngOnInit() {

	}


	openProduct(id: string) {
		this.router.navigate(['products', id]);
	}

	openSupplier(id: string) {
		this.router.navigate(['suppliers', id]);
	}

	toggleMySamples(show: boolean) {
		const userId = this.userSrv.user.id;

		const filterAssignee = {
			type: FilterType.ASSIGNEE,
			value: userId
		};
		if (show) this.filterSrv.addFilter(filterAssignee);
		else this.filterSrv.removeFilter(filterAssignee);
	}

	openCreationSampleDlg(product?: Product, supplier?: Supplier) {
		return this.dlgSrv
			.open(SampleCreationDialogComponent, { product, supplier })
			// don't implement creation Sample => deprecated component
			// .pipe(
			// 	filter((event: CloseEvent) => event.type === CloseEventType.OK),
			// 	switchMap(_ => this.listHelper.refetch())
			// )
			// .subscribe();
	}
}
