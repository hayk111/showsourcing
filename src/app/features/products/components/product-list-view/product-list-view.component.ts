import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
	TemplateRef,
	ViewChild,
	OnInit,
} from '@angular/core';
import { ColumnDescriptor, TableDescriptor } from '~app/shared/table';
import { Product } from '~product';
import { FilterActions, FilterGroupName } from '~app/shared/filters';
import { Store } from '@ngrx/store';

@Component({
	selector: 'product-list-view-app',
	templateUrl: './product-list-view.component.html',
	styleUrls: ['./product-list-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListViewComponent implements OnInit {
	// events
	@Output() productSelect = new EventEmitter<string>();
	@Output() productUnselect = new EventEmitter<string>();
	@Output() productOpen = new EventEmitter<string>();
	@Output() productFavorited = new EventEmitter<string>();
	@Output() productUnfavorited = new EventEmitter<string>();
	@Output() bottomReached = new EventEmitter<null>();
	// inputs
	@Input() products: Array<Product>;
	// currently selected items
	@Input() selection: Map<string, boolean>;

	// templates
	// load cells template for custom table
	@ViewChild('main') mainTemplate: TemplateRef<any>;
	@ViewChild('supplier') supplierTemplate: TemplateRef<any>;
	@ViewChild('category') categoryTemplate: TemplateRef<any>;
	@ViewChild('price') priceTemplate: TemplateRef<any>;
	@ViewChild('feedback') feedbackTemplate: TemplateRef<any>;
	@ViewChild('creationDate') creationDateTemplate: TemplateRef<any>;
	@ViewChild('rating') ratingTemplate: TemplateRef<any>;
	@ViewChild('user') userTemplate: TemplateRef<any>;
	@ViewChild('action') actionTemplate: TemplateRef<any>;
	@ViewChild('default') defaultTemplate: TemplateRef<any>;
	filterGroupName: FilterGroupName = FilterGroupName.PRODUCT_PAGE;

	descriptor: TableDescriptor = [
		{ title: 'Product', type: 'main', sortable: true, sortWith: 'name', width: 280 },
		{ title: 'Supplier', type: 'supplier', sortWith: 'supplierName', width: 140 },
		{ title: 'Category', type: 'category', sortWith: 'categoryName', width: 140 },
		{ title: 'Price', type: 'price', sortWith: 'priceAmount', width: 50 },
		{ title: 'Rating', type: 'feedback', sortWith: 'score', width: 50 },
		{ title: 'Created on', type: 'creationDate', sortWith: 'creationDate', width: 50 },
		{ title: 'Fav', type: 'rating', sortWith: 'rating', width: 50 },
		{ title: 'Created by', type: 'user', sortWith: 'createdByUserId', width: 140 },
		{ title: 'Actions', type: 'action', sortable: false, width: 140 },
		{ title: 'MOQ', type: 'txt', propName: 'minimumOrderQuantity', sortWith: 'minimumOrderQuantity', width: 50 },
	];

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.linkColumns();
	}

	// links a column in the descriptor with one of the template defined in product-list-view.component.html
	linkColumns() {
		this.descriptor.forEach(column => this.linkColumnWithTemplate(column));
	}

	onSort({ order, sortWith }) {
		// we first need to remove the current sorting filter
		// this.store.dispatch(FilterActions.removeFiltersForFilterClass(this.filterGroupName, FilterSort));
		// // then we add a new one
		// const filter = new FilterSort(sortWith, order.toUpperCase());
		// this.store.dispatch(FilterActions.addFilter(filter, this.filterGroupName));
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
			case 'feedback':
				column.template = this.feedbackTemplate;
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
