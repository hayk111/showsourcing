import { Router, ActivatedRoute } from '@angular/router';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { SampleService, UserService } from '~entity-services';
import { ERM, Sample } from '~models';
import { Filter, FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { DialogService, CloseEventType, CloseEvent } from '~shared/dialog';
import { CreationSampleDlgComponent } from '~common/modals/component/creation-sample-dlg/creation-sample-dlg.component';
import { filter, switchMap } from 'rxjs/operators';

/** since we use the sample component on different pages, this page will keep the methods clean */
export abstract class AbstractSampleCommonComponent extends AutoUnsub {
	public trackById = (index, item) => item.id;

	constructor(
		protected router: Router,
		protected route: ActivatedRoute,
		protected userSrv: UserService,
		protected sampleSrv: SampleService,
		protected dlgSrv: DialogService,
		public listSrv: ListPageService<Sample, SampleService>,
		public commonModalSrv: CommonModalService
	) {
		super();
	}

	setup(addedFilters: Filter[] = []) {
		const id = this.route.parent.snapshot.params.id;
		const userId = this.userSrv.userSync.id;
		this.listSrv.setup({
			key: `${ListPageKey.SAMPLE}-${id}`,
			entitySrv: this.sampleSrv,
			searchedFields: ['name', 'supplier.name', 'product.name', 'assignee.firstName', 'assignee.lastName'],
			selectParams: { query: 'deleted == false' },
			entityMetadata: ERM.SAMPLE,
			initialFilters: [
				{ type: FilterType.ASSIGNEE, value: userId },
				{ type: FilterType.DELETED, value: false },
				...addedFilters
			],
			originComponentDestroy$: this._destroy$
		});
	}

	openProduct(id: string) {
		this.router.navigate([ERM.PRODUCT.singular, id]);
	}

	openSupplier(id: string) {
		this.router.navigate([ERM.SUPPLIER.singular, id]);
	}

	toggleMySamples(show: boolean) {
		const userId = this.userSrv.userSync.id;

		const filterAssignee = {
			type: FilterType.ASSIGNEE,
			value: userId
		};
		if (show)
			this.listSrv.addFilter(filterAssignee);
		else
			this.listSrv.removeFilter(filterAssignee);
	}

	openCreationSampleDlg(product, supplier) {
		this.dlgSrv.open(CreationSampleDlgComponent, { product, supplier }).pipe(
			filter((event: CloseEvent) => event.type === CloseEventType.OK),
			switchMap(_ => this.listSrv.refetch({}))
		).subscribe();
	}
}
