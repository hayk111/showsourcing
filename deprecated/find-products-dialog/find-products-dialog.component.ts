import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { ListPageService } from '~core/list-page/list-page.service';
import { SelectionService } from '~core/list-page/selection.service.ts';
import { ProductService } from '~entity-services';
import { ERM, Product, Project } from '~models';
import { CloseEventType, DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'find-products-dialog-app',
	templateUrl: './find-products-dialog.component.html',
	styleUrls: ['./find-products-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ListPageService, SelectionService]
})
export class FindProductsDialogComponent extends AutoUnsub implements OnInit {
	@Input() initialSelectedProducts: Product[];
	@Input() project: Project;

	searchFilterElements$: Observable<any[]>;
	unselectedProducts: { [key: string]: Product } = {};
	selectedProducts: { [key: string]: Product } = {};

	constructor(
		public listSrv: ListPageService<Product, ProductService>,
		private productSrv: ProductService,
		private dlgSrv: DialogService,
		private selectionSrv: SelectionService
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.productSrv,
			searchedFields: ['name', 'supplier.name', 'category.name'],
			selectParams: {
				sortBy: 'category.name',
				descending: true,
				take: 15,
				query: 'deleted == false'
			},
			entityMetadata: ERM.PRODUCT,
			originComponentDestroy$: this._destroy$
		});
		this.initialSelection();
	}

	initialSelection() {
		if (
			this.initialSelectedProducts &&
			this.initialSelectedProducts.length > 0
		) {
			this.initialSelectedProducts.forEach(product => {
				this.selectedProducts[product.id] = product;
			});
			this.selectionSrv.selectAll(
				this.initialSelectedProducts.map(product => ({ id: product.id }))
			);
		}
	}

	hasSelectedProducts() {
		return Array.from(this.selectionSrv.selection.values()).length > 0;
	}

	onItemSelected(entity: any) {
		this.selectedProducts[entity.id] = entity;
		delete this.unselectedProducts[entity.id];
		this.selectionSrv.selectOne(entity);
	}

	onItemUnselected(entity: any) {
		this.unselectedProducts[entity.id] = entity;
		delete this.selectedProducts[entity.id];
		this.selectionSrv.unselectOne(entity);
	}

	closeDlg() {
		this.dlgSrv.close();
	}

	submit() {
		// we add each project one by one to the store
		const selectedProducts = Object.values(this.selectedProducts);
		const unselectedProducts = Object.values(this.unselectedProducts);
		const data = { selectedProducts, unselectedProducts };
		this.dlgSrv.close({
			type: CloseEventType.OK,
			data
		});
	}
}
