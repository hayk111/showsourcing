import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { CreationSampleDlgComponent } from '~common/dialogs/creation-dialogs';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ListPageService } from '~core/list-page';
import { SampleService, UserService } from '~entity-services';
import { ERM, Product, Sample, Supplier } from '~models';
import { CloseEvent, CloseEventType, DialogService } from '~shared/dialog';
import { Filter, FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils/auto-unsub.component';

/** since we use the sample component on different pages, this page will keep the methods clean */
export abstract class AbstractSampleCommonComponent extends AutoUnsub implements OnInit {
	public trackById = (index, item) => item.id;

	constructor(
		protected router: Router,
		protected route: ActivatedRoute,
		protected userSrv: UserService,
		protected sampleSrv: SampleService,
		protected dlgSrv: DialogService,
		public listSrv: ListPageService<Sample, SampleService>,
		public dialogCommonSrv: DialogCommonService
	) {
		super();
	}

	ngOnInit() {
		this.sampleSrv.sampleListUpdate$.pipe(
			switchMap(_ => this.listSrv.refetch({})),
			takeUntil(this._destroy$)
		).subscribe();
	}

	setup(addedFilters: Filter[] = []) {
		const id = this.route.parent.snapshot.params.id;
		const userId = this.userSrv.userSync.id;
		this.listSrv.setup({
			entitySrv: this.sampleSrv,
			searchedFields: ['name', 'supplier.name', 'product.name', 'assignee.firstName', 'assignee.lastName', 'reference'],
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

	openCreationSampleDlg(product?: Product, supplier?: Supplier) {
		this.dlgSrv.open(CreationSampleDlgComponent, { product, supplier }).pipe(
			filter((event: CloseEvent) => event.type === CloseEventType.OK),
			switchMap(_ => this.listSrv.refetch({}))
		).subscribe();
	}
}
