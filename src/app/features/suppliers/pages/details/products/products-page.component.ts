import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Product, Supplier } from '~core/erm';
import { FilterService, FilterType } from '~core/filters';
import { ListHelper2Service, ListPageViewService, SelectionService } from '~core/list-page2';
import { AutoUnsub } from '~utils';
import { ID } from '~utils/id.utils';
import { api } from 'showsourcing-api-lib';

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'table-page' },
	providers: [ListHelper2Service, SelectionService, FilterService]
})
export class ProductsPageComponent extends AutoUnsub implements OnInit {
	supplierId: ID;
	supplier: Supplier;
	// filter displayed as button in the filter panel
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

	constructor(
		private route: ActivatedRoute,
		public listHelper: ListHelper2Service,
		public dlgCommonSrv: DialogCommonService,
		public selectionSrv: SelectionService,
		public filterSrv: FilterService,
		public viewSrv: ListPageViewService<any>
	) {
		super();
	}

	ngOnInit() {
		this.supplierId = this.route.parent.snapshot.params.id;
		this.supplier = { id: this.supplierId };
		this.listHelper.setup('Product', this._destroy$, (opts) => api.Supplier.products(this.supplierId, opts));
	}

	/** instead of deleting the product, we deassociate the supplier from it */
	deassociateOneProduct(product?: Product) {
		this.listHelper.updateSelected({ id: product.id, supplier: undefined });
	}

	/** instead of deleting the selected products, we deassociate the supplier from them */
	deassociateSelectedProducts(product?: Product) {
		this.listHelper.updateSelected({ supplier: undefined });
	}

	addProject() {
		const validation$ = this.dlgCommonSrv.openSelectionDlg(
			'Project',
			this.selectionSrv.getSelectedValues()
		).data$;
		validation$.subscribe(data => {
			// TODO add projects to products
		});
	}
}
