import { AfterViewInit, Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ListPageKey } from '~core/list-page/list-page-keys.enum';
import { ListPageService } from '~core/list-page/list-page.service';
import { ProductService } from '~entity-services';
import { ERM, Product } from '~models';
import { DialogService, CloseEventType } from '~shared/dialog';
import { TrackingComponent } from '~utils/tracking-component';


@Component({
	selector: 'find-products-dialog-app',
	templateUrl: './find-products-dialog.component.html',
	styleUrls: ['./find-products-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ListPageService],

})
export class FindProductsDialogComponent extends TrackingComponent implements OnInit, AfterViewInit {

	@Input() initialSelectedProducts: Product[];
	searchFilterElements$: Observable<any[]>;
	unselectedProducts: { [key: string]: Product } = {};
	selectedProducts: { [key: string]: Product } = {};

	constructor(
		public listSrv: ListPageService<Product, ProductService>,
		private productSrv: ProductService,
		private dlgSrv: DialogService
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.FIND_PRODUCT,
			entitySrv: this.productSrv,
			searchedFields: ['name', 'supplier.name', 'category.name'],
			selectParams: { query: 'deleted == false', sortBy: 'category.name', descending: true, take: 15 },
			entityMetadata: ERM.PRODUCT,
		});
	}

	ngAfterViewInit() {
		if (this.initialSelectedProducts && this.initialSelectedProducts.length > 0) {
			this.listSrv.selectAll(this.initialSelectedProducts.map(product => ({ id: product.id })));
		}
	}

	hasSelectedProducts() {
		return (Array.from(this.listSrv.selectionSrv.selection.values()).length > 0);
	}

	onItemSelected(entity: any) {
		this.selectedProducts[entity.id] = entity;
		delete this.unselectedProducts[entity.id];
		this.listSrv.selectionSrv.selectOne(entity, false);
	}

	onItemUnselected(entity: any) {
		this.unselectedProducts[entity.id] = entity;
		delete this.selectedProducts[entity.id];
		this.listSrv.selectionSrv.unselectOne(entity, false);
	}

	closeDlg() {
		this.dlgSrv.close();
	}

	submit() {
		// we add each project one by one to the store
		// const selectedProducts = this.listSrv.getSelectedValues();
		const selectedProducts = Object.values(this.selectedProducts);
		const unselectedProducts = Object.values(this.unselectedProducts);
		const data = { selectedProducts, unselectedProducts };
		this.dlgSrv.close({
			type: CloseEventType.OK,
			data
		});
	}
}
