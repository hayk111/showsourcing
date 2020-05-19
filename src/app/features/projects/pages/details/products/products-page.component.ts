import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	OnInit,
	Output,
	ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SupplierRequestDialogComponent } from '~common/dialogs/custom-dialogs/supplier-request-dialog/supplier-request-dialog.component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ProductsTableComponent } from '~common/tables/products-table/products-table.component';
import {
	ERM,
	Product,
	Project,
	SelectParamsConfig
} from '~core/erm';
import { DialogService } from '~shared/dialog/services';
import { FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils';
import { FilterService } from '~core/filters';
import { ListPageViewService, SelectionService, ExcludedService, ListFuseHelperService } from '~core/list-page2';
import { PaginationService } from '~shared/pagination/services/pagination.service';
import _ from 'lodash';
import { TeamService } from '~core/auth';
import { ApiService } from '~core/erm3/services/api.service';
import { customQueries } from '~core/erm3/queries/custom-queries';

@Component({
	selector: 'products-page-app',
	styleUrls: ['products-page.component.scss'],
	templateUrl: './products-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListFuseHelperService,
		ListPageViewService,
		FilterService,
		SelectionService
	],
	host: {
		class: 'table-page'
	}
})
export class ProductsPageComponent extends AutoUnsub implements OnInit {
	@Output() delete = new EventEmitter<Project>();
	@Output() archive = new EventEmitter<Project>();

	filterTypes = [
		FilterType.ARCHIVED,
		FilterType.CATEGORY,
		FilterType.CREATED_BY,
		FilterType.EVENT,
		FilterType.FAVORITE,
		FilterType.STATUS,
		FilterType.PROJECTS,
		FilterType.TAGS
	];

	filteredProducts$: Observable<any>;
	projectProducts = [];
	projectId: string;

	pending = true;
	project$: Observable<Project>;
	filterTypeEnum = FilterType;
	erm = ERM;

	selectItemsConfig: SelectParamsConfig;
	columns = ProductsTableComponent.DEFAULT_COLUMNS;
	tableConfig = ProductsTableComponent.DEFAULT_TABLE_CONFIG;

	constructor(
		public listHelper: ListFuseHelperService,
		public viewSrv: ListPageViewService<any>,
		private excludedSrv: ExcludedService,
		private dlgSrv: DialogService,
		private route: ActivatedRoute,
		public dialogCommonSrv: DialogCommonService,
		public selectionSrv: SelectionService,
		private paginationSrv: PaginationService,
		private filterSrv: FilterService,
		private apiSrv: ApiService,
		private cdr: ChangeDetectorRef,
	) {
		super();
	}

	ngOnInit() {
		this.projectId =  this.route.parent.snapshot.params.id;
		this.paginationSrv.setLimit(10000);

		this.apiSrv.query<any>({
			query: customQueries.getProjectProducts,
			variables: { id: this.projectId },
			fetchPolicy: 'network-only'
		}, false)
		.data$
			.pipe(
				map(project => {
					return project.products.items.map(item => item.product);
				}),
				tap(products => {
					this.excludedSrv.excludedIds = products.map(product => product.id );
					this.projectProducts = products;
					this.pending = false;
					this.cdr.markForCheck();
				})
			).subscribe();
	}

	/**
	 * Deassociate the product from the current project
	 */
	deassociateProductById(id: string) {
		// const unselectedProducts = [{ id }];
		// this.featureSrv
		// 	.manageProjectsToProductsAssociations([this.project], {
		// 		unselectedProducts
		// 	})
		// 	.pipe(switchMap(_ => this.listSrv.refetch()))
		// 	.subscribe();
	}

	/**
	 * Deassociate the selected products from the current project
	 */
	deassociateSelectedProducts() {
		// const unselectedProducts = this.selectionSrv
		// 	.getSelectedIds()
		// 	.map(id => ({ id }));
		// this.featureSrv
		// 	.manageProjectsToProductsAssociations([this.project], {
		// 		unselectedProducts
		// 	})
		// 	.pipe(switchMap(_ => this.listSrv.refetch()))
		// 	.subscribe();
		// this.selectionSrv.unselectAll();
	}

	/** Open the find products dialog and passing selected products to it */
	openFindProductDlg() {
		// this.featureSrv
		// 	.openFindProductDlg(this.project)
		// 	.pipe(switchMap(_ => this.listSrv.refetch()))
		// 	.subscribe();
	}

	onArchive(product: Product | Product[]) {
		// TODO: to be implement
	}

	onOpenCreateRequestDlg(products: Product[]) {
		return this.dlgSrv.open(SupplierRequestDialogComponent, { products });
	}

	addProducts() {
		this.dialogCommonSrv.openSelectionDlg('Product', this.excludedSrv.excludedIds).data$
			.pipe(
				tap(products => this.projectProducts.push(...products)),
				map(products => products.map(p => p.id)),
				tap(productIds => {
					this.excludedSrv.excludedIds = this.excludedSrv.excludedIds.concat(productIds);
				})
			)
			.subscribe((productIds: string[]) => {
				if (productIds.length) {
					productIds.forEach(productId => {
						this.apiSrv.create('ProjectProduct', {
							teamId: TeamService.teamSelected.id,
							productId,
							projectId: this.projectId
						}).subscribe();
					});
				}
			});
	}
}
