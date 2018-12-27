import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ProductService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, Product } from '~models';
import { FilterType } from '~shared/filters';
import { TrackingComponent } from '~utils/tracking-component';
import { CommonModalService } from '~common/modals';

// dailah lama goes into pizza store
// servant asks : what pizza do you want sir ?
// dailah lama: Make me one with everything.

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
	providers: [
		ListPageService
	]
})
export class ProductsPageComponent extends TrackingComponent implements OnInit {
	erm = ERM.PRODUCT;
	// filter displayed as button in the filter panel
	filterTypes = [
		FilterType.SUPPLIER,
		FilterType.CATEGORY,
		FilterType.TAGS,
		FilterType.PROJECTS,
		FilterType.FAVORITE,
		FilterType.ARCHIVED,
	];

	constructor(
		private productSrv: ProductService,
		public commonModalSrv: CommonModalService,
		public listSrv: ListPageService<Product, ProductService>,
		private elRef: ElementRef,
		private render: Renderer2
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.PRODUCTS,
			entitySrv: this.productSrv,
			searchedFields: ['name', 'supplier.name', 'category.name'],
			initialFilters: [{ type: FilterType.ARCHIVED, value: false }, { type: FilterType.DELETED, value: false }],
			entityMetadata: ERM.PRODUCT,
		});
	}

	onViewChange(view: 'list' | 'card') {
		// Update sorting according to the selected view
		console.log(this.elRef.nativeElement);
		if (view === 'list') {
			this.render.setStyle(this.elRef.nativeElement, 'height', '100%');
		}
		this.listSrv.sort({ sortBy: 'category.name', descending: false });
		this.listSrv.changeView(view);
	}

}
