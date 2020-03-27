import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	OnInit,
	Output
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SupplierRequestDialogComponent } from '~common/dialogs/custom-dialogs/supplier-request-dialog/supplier-request-dialog.component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ProductsTableComponent } from '~common/tables/products-table/products-table.component';
import {
	ERM,
	Product,
	ProductService,
	Project,
	SelectParamsConfig
} from '~core/erm';
import { ProjectFeatureService } from '~features/projects/services';
import { DialogService } from '~shared/dialog/services';
import { FilterType } from '~shared/filters';
import { ToastService, ToastType } from '~shared/toast';
import { AutoUnsub } from '~utils';
import { ListHelperService, ListPageViewService, SelectionService } from '~core/list-page2';

@Component({
	selector: 'products-page-app',
	styleUrls: ['products-page.component.scss'],
	templateUrl: './products-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [],
	host: {
		class: 'table-page'
	}
})
export class ProductsPageComponent extends AutoUnsub implements OnInit {
	@Output() delete = new EventEmitter<Project>();
	@Output() archive = new EventEmitter<Project>();

	project$: Observable<Project>;
	private project: Project;
	filterTypeEnum = FilterType;
	erm = ERM;

	selectItemsConfig: SelectParamsConfig;

	filterTypes = [
		FilterType.ARCHIVED,
		FilterType.CATEGORY,
		FilterType.CREATED_BY,
		FilterType.EVENT,
		FilterType.FAVORITE,
		FilterType.STATUS,
		FilterType.PROJECTS,
		FilterType.SUPPLIER,
		FilterType.TAGS
	];

	columns = ProductsTableComponent.DEFAULT_COLUMNS;
	tableConfig = ProductsTableComponent.DEFAULT_TABLE_CONFIG;

	constructor(
		public listHelper: ListHelperService,
		public viewSrv: ListPageViewService<any>,
		private featureSrv: ProjectFeatureService,
		private dlgSrv: DialogService,
		private route: ActivatedRoute,
		private productSrv: ProductService,
		public dialogCommonSrv: DialogCommonService,
		private toastSrv: ToastService,
		private translate: TranslateService,
		public selectionSrv: SelectionService
	) {
		super();
	}

	ngOnInit() {
		this.listHelper.setup('Product');
		const id = this.route.parent.snapshot.params.id;
		this.project$ = this.featureSrv.queryOne(id);

		this.project$.subscribe(proj => (this.project = proj));
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
}
