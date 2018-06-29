import {
	ChangeDetectionStrategy, Component, OnInit, ViewChild, Output,
	EventEmitter, TemplateRef, Renderer2
} from '@angular/core';
import { Router } from '@angular/router';
import { NewProductDialogComponent } from '~features/products/components/new-product-dialog/new-product-dialog.component';
import { ProductService } from '~global-services';
import { Product, ERM } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterService } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { StoreKey } from '~utils';
import { TableDescriptor, ColumnDescriptor } from '~shared/table';

@Component({
	selector: 'project-products-app',
	templateUrl: './project-products.component.html',
	styleUrls: [
		'../../../../../app/theming/specific/list.scss',
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		SelectionService,
		FilterService,
		{ provide: 'storeKey', useValue: StoreKey.FILTER_PROJECT_PRODUCTS }
	]
})
export class ProjectProductsComponent extends ListPageComponent<Product, ProductService>
	implements OnInit {

	// TODO, I think we will have to rethink the descriptor / custom table thing
	// because this won't really work with the type of descriptor Antoine is envisaging
	@Output() openAddToProjectDialog = new EventEmitter<Product>();
	@Output() openExportDialog = new EventEmitter<Product>();
	@Output() openRequestFeedbackDialog = new EventEmitter<Product>();
	// templates
	// load cells template for custom table
	@ViewChild('main') mainTemplate: TemplateRef<any>;
	@ViewChild('supplier') supplierTemplate: TemplateRef<any>;
	@ViewChild('category') categoryTemplate: TemplateRef<any>;
	@ViewChild('price') priceTemplate: TemplateRef<any>;
	@ViewChild('moq') moqTemplate: TemplateRef<any>;
	@ViewChild('feedback') feedbackTemplate: TemplateRef<any>;
	@ViewChild('status') statusTemplate: TemplateRef<any>;
	@ViewChild('creationDate') creationDateTemplate: TemplateRef<any>;
	@ViewChild('rating') ratingTemplate: TemplateRef<any>;
	@ViewChild('user') userTemplate: TemplateRef<any>;
	@ViewChild('action') actionTemplate: TemplateRef<any>;
	@ViewChild('default') defaultTemplate: TemplateRef<any>;
	@ViewChild('contextualMenu') contextualMenuTemplate: TemplateRef<any>;

	descriptor: TableDescriptor = [
		{ title: 'Name', type: 'main', sortable: true, sortBy: 'name', width: 280 },
		{ title: 'Category', type: 'category', sortBy: 'category.name', width: 120 },
		{ title: 'Supplier', type: 'supplier', sortBy: 'supplier.name', width: 120 },
		{ title: 'Price', type: 'price', sortBy: 'price', width: 50 },
		{ title: 'MOQ', type: 'moq', propName: 'minimumOrderQuantity', sortBy: 'minimumOrderQuantity', width: 50 },
		{ title: 'FAV', type: 'rating', sortBy: 'rating', width: 15 },
		{ title: 'Status', type: 'status', sortBy: 'status.name', width: 85 },
		{ title: 'Created on', type: 'creationDate', sortBy: 'creationDate', width: 120 }
	];

	constructor(
		protected router: Router,
		protected srv: ProductService,
		protected selectionSrv: SelectionService,
		protected filterSrv: FilterService,
		protected dlgSrv: DialogService,
		private renderer: Renderer2) {
		super(router, srv, selectionSrv, filterSrv, dlgSrv, ERM.PRODUCT, NewProductDialogComponent);
	}

	ngOnInit() {
		this.linkColumns();
		super.ngOnInit();
	}

	// links a column in the descriptor with one of the template defined in product-list-view.component.html
	linkColumns() {
		this.descriptor.forEach(column => this.linkColumnWithTemplate(column));
	}

	// we add a template for the correct column type
	linkColumnWithTemplate(column: ColumnDescriptor) {
		switch (column.type) {
			case 'main':
				column.template = this.mainTemplate;
				break;
			case 'supplier':
				column.template = this.supplierTemplate;
				break;
			case 'category':
				column.template = this.categoryTemplate;
				break;
			case 'price':
				column.template = this.priceTemplate;
				break;
			case 'moq':
				column.template = this.moqTemplate;
				break;
			case 'feedback':
				column.template = this.feedbackTemplate;
				break;
			case 'status':
				column.template = this.statusTemplate;
				break;
			case 'creationDate':
				column.template = this.creationDateTemplate;
				break;
			case 'rating':
				column.template = this.ratingTemplate;
				break;
			case 'user':
				column.template = this.userTemplate;
				break;
			case 'action':
				column.template = this.actionTemplate;
				break;
			default:
				column.template = this.defaultTemplate;
		}
	}

	onTogglePreview(overviewElement, display) {
		this.renderer.setStyle(overviewElement, 'display', display ? 'block' : 'none');
	}

}
