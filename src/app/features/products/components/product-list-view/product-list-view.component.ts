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
import { Product } from '~products';

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

	descriptor: TableDescriptor = [
		{ title: 'Product', type: 'main', sortable: true },
		{ title: 'Supplier', type: 'supplier' },
		{ title: 'Category', type: 'category' },
		{ title: 'Price', type: 'price' },
		{ title: 'Feedback', type: 'feedback' },
		{ title: 'Created on', type: 'creationDate' },
		{ title: '', type: 'rating' },
		{ title: 'Created by', type: 'user' },
		{ title: 'Actions', type: 'action' },
		{ title: 'MOQ', type: 'txt', propName: 'minimumOrderQuantity' },
	];

	constructor() {}

	ngOnInit() {
		this.linkColumns();
	}

	onCheck(event, productId) {
		event.preventDefault();
		event.stopPropagation();
		if (event.target.checked) this.productSelect.emit(productId);
		else this.productUnselect.emit(productId);
	}

	// when bottom is reached
	onBottomReached() {
		console.log('bottom reached !');
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
