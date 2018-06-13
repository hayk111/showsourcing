import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
	TemplateRef,
	ViewChild,
	ViewChildren,
	OnInit,
	ElementRef,
	Renderer2
} from '@angular/core';
import { ColumnDescriptor, TableDescriptor } from '~shared/table';
import { Product } from '~models';


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
	@Output() previewClick = new EventEmitter<Product>();
	@Output() bottomReached = new EventEmitter<null>();
	@Output() sortColumn = new EventEmitter<{ order: 'ASC' | 'DESC'; sortWith: string; }>();
	@Output() openAddToProjectDialog = new EventEmitter<Product>();
	@Output() openExportDialog = new EventEmitter<Product>();
	@Output() openRequestFeedbackDialog = new EventEmitter<Product>();
	@Output() delete = new EventEmitter<Product>();

	// inputs
	@Input() products: Array<Product>;
	// currently selected items
	@Input() selection: Map<string, boolean>;
	@Input() pending: boolean;

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
		{ title: 'Name', type: 'main', sortable: true, sortWith: 'name', width: 280 },
		{ title: 'Category', type: 'category', sortWith: 'category.name', width: 120 },
		{ title: 'Supplier', type: 'supplier', sortWith: 'supplier.name', width: 120 },
		{ title: 'Price', type: 'price', sortWith: 'price', width: 50 },
		{ title: 'MOQ', type: 'moq', propName: 'minimumOrderQuantity', sortWith: 'minimumOrderQuantity', width: 50 },
		{ title: 'FAV', type: 'rating', sortWith: 'rating', width: 15 },
		{ title: 'Status', type: 'status', sortWith: 'status.name', width: 85 },
		/* { title: 'Rating', type: 'feedback', sortWith: 'score', width: 50 }, */
		{ title: 'Created on', type: 'creationDate', sortWith: 'creationDate', width: 120 }
		/* { title: 'Created by', type: 'user', sortWith: 'createdBy.id', width: 140 },
		{ title: 'Actions', type: 'action', sortable: false, width: 140 }, */
	];

	constructor(private renderer: Renderer2) { }

	ngOnInit() {
		this.linkColumns();
	}

	// links a column in the descriptor with one of the template defined in product-list-view.component.html
	linkColumns() {
		this.descriptor.forEach(column => this.linkColumnWithTemplate(column));
	}

	onSort({ order, sortWith }) {
		console.log('>> onSort');
		console.log('  >> order = ', order);
		console.log('  >> sortWith = ', sortWith);
		// we first need to remove the current sorting filter
		// this.store.dispatch(FilterActions.removeFiltersForFilterClass(this.filterGroupName, FilterSort));
		// // then we add a new one
		// const filter = new FilterSort(sortWith, order.toUpperCase());
		// this.store.dispatch(FilterActions.addFilter(filter, this.filterGroupName));
		this.sortColumn.emit({ order, sortWith });
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
