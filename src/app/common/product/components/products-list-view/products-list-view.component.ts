import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import { ListViewComponent } from '~core/list-page/list-view.component';
import { ERM, Product } from '~models';
import { ColumnDescriptor, TableDescriptor } from '~shared/table';
import { Sort } from '~shared/table/components/sort.interface';
import { translate } from '~utils';


@Component({
	selector: 'products-list-view-app',
	templateUrl: './products-list-view.component.html',
	styleUrls: [
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListViewComponent extends ListViewComponent<Product> implements OnInit {

	@Input() currentSort: Sort;
	// TODO, I think we will have to rethink the descriptor / custom table thing
	// because this won't really work with the type of descriptor Antoine is envisaging
	@Output() openAddToProjectDialog = new EventEmitter<Product>();
	@Output() openExportDialog = new EventEmitter<Product>();
	@Output() openRequestFeedbackDialog = new EventEmitter<Product>();
	@Output() openCreateRequestDlg = new EventEmitter<Product>();

	// templates
	// load cells template for custom table
	@ViewChild('main', { static: true }) mainTemplate: TemplateRef<any>;
	@ViewChild('supplier', { static: true }) supplierTemplate: TemplateRef<any>;
	@ViewChild('category', { static: true }) categoryTemplate: TemplateRef<any>;
	@ViewChild('price', { static: true }) priceTemplate: TemplateRef<any>;
	@ViewChild('moq', { static: true }) moqTemplate: TemplateRef<any>;
	@ViewChild('feedback', { static: false }) feedbackTemplate: TemplateRef<any>;
	@ViewChild('status', { static: true }) statusTemplate: TemplateRef<any>;
	@ViewChild('creationDate', { static: true }) creationDateTemplate: TemplateRef<any>;
	@ViewChild('rating', { static: true }) ratingTemplate: TemplateRef<any>;
	@ViewChild('user', { static: true }) userTemplate: TemplateRef<any>;
	@ViewChild('action', { static: false }) actionTemplate: TemplateRef<any>;
	@ViewChild('default', { static: true }) defaultTemplate: TemplateRef<any>;
	@ViewChild('contextualMenu', { static: true }) contextualMenuTemplate: TemplateRef<any>;
	prodErm = ERM.PRODUCT;

	descriptor: TableDescriptor = [
		{ title: translate('name'), type: 'main', sortable: true, sortBy: 'name', width: 350 },
		{ title: translate(ERM.CATEGORY.singular, 'erm'), type: 'category', sortBy: 'category.name', width: 200 },
		{ title: translate(ERM.SUPPLIER.singular, 'erm'), type: 'supplier', sortBy: 'supplier.name', width: 200 },
		{ title: translate(ERM.PRICE.singular, 'erm'), type: 'price', sortBy: 'price.value', width: 130 },
		{ title: translate('MOQ'), type: 'moq', propName: 'minimumOrderQuantity', sortBy: 'minimumOrderQuantity', width: 130 },
		{ title: translate('Fav'), type: 'rating', sortBy: 'favorite', width: 100 },
		{ title: translate('status'), type: 'status', sortBy: 'status.step', width: 170 },
		{ title: translate('created on'), type: 'creationDate', sortBy: 'creationDate', width: 200 }
	];

	constructor() {
		super();
	}

	ngOnInit() {
		this.linkColumns();
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
}
