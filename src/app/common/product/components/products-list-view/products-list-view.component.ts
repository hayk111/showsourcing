import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	TemplateRef,
	ViewChild,
	OnChanges,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import ColumnType from './column-type.enum';
import { ListViewComponent } from '~core/list-page/list-view.component';
import { RequestElementService } from '~core/entity-services';
import { ERM, Product, Task } from '~models';
import { translate } from '~utils';
import { ColumnDescriptor, TableDescriptor } from '~shared/table';
import { Sort } from '~shared/table/components/sort.interface';

@Component({
	selector: 'products-list-view-app',
	templateUrl: './products-list-view.component.html',
	styleUrls: [
		'./products-list-view.component.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListViewComponent extends ListViewComponent<Product> implements OnInit, OnChanges {

	@Input() hasMenu = true;
	@Input() productPreview = true;
	@Input() isInProductSelectDlg = false;
	@Input() currentSort: Sort;
	@Input() tableWidth: number;
	// TODO, I think we will have to rethink the descriptor / custom table thing
	// because this won't really work with the type of descriptor Antoine is envisaging
	@Output() setFavourite = new EventEmitter<Product>();
	@Output() openAddToProjectDialog = new EventEmitter<Product>();
	@Output() openAddTaskDialog = new EventEmitter<Product>();
	@Output() openAddSampleDialog = new EventEmitter<Product>();

	@Output() archive = new EventEmitter<Product>();
	@Output() delete = new EventEmitter<Product>();
	@Output() showItemsPerPage = new EventEmitter<number>();

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
	@ViewChild('createdBy', { static: true }) createdByTemplate: TemplateRef<any>;
	@ViewChild('rating', { static: true }) ratingTemplate: TemplateRef<any>;
	@ViewChild('user', { static: true }) userTemplate: TemplateRef<any>;
	@ViewChild('action', { static: false }) actionTemplate: TemplateRef<any>;
	@ViewChild('activities', { static: true }) activitiesTemplate: TemplateRef<any>;
	@ViewChild('default', { static: true }) defaultTemplate: TemplateRef<any>;
	@ViewChild('contextualMenu', { static: true }) contextualMenuTemplate: TemplateRef<any>;
	prodErm = ERM.PRODUCT;

	descriptor: TableDescriptor = [];
	constructor(
		private requestElementService: RequestElementService,
		) {
		super();
	}

	ngOnInit() {
		if (this.isInProductSelectDlg) {
			this.descriptor =  [
				{ title: translate('name'), type: ColumnType.MAIN, sortable: true, sortBy: 'name', width: 280, minWidth: 120 },
				{ title: translate(ERM.CATEGORY.singular, 'erm'), type: ColumnType.CATEGORY, sortBy: 'category.name', width: 120, minWidth: 120 },
				{ title: translate(ERM.SUPPLIER.singular, 'erm'), type: ColumnType.SUPPLIER, sortBy: 'supplier.name', width: 120, minWidth: 120 },
				{ title: translate(ERM.PRICE.singular, 'erm'), type: ColumnType.PRICE, sortBy: 'price.value', width: 50, minWidth: 50 },
				{ title: translate('Fav'), type: ColumnType.RATING, sortBy: 'favorite', width: 15, minWidth: 50 },
				{ title: translate('created by'), type: ColumnType.CREATED_BY, sortBy: 'createdBy', sortable: false, width: 120, minWidth: 120 }
			];
		} else {
			this.descriptor =  [
				{ title: translate('reference'), type: ColumnType.MAIN, sortable: true, sortBy: 'name', minWidth: 120 },
				{ title: translate(ERM.PRICE.singular, 'erm'), type: ColumnType.PRICE, sortBy: 'price.value', minWidth: 50 },
				{ title: translate(ERM.SUPPLIER.singular, 'erm'), type: ColumnType.SUPPLIER, sortBy: 'supplier.name', minWidth: 120 },
				{ title: translate(ERM.CATEGORY.singular, 'erm'), type: ColumnType.CATEGORY, sortBy: 'category.name', minWidth: 120 },
				{ title: translate('created by'), type: ColumnType.CREATED_BY, sortBy: 'createdBy', sortable: false, minWidth: 120 },
				{ title: translate('activity'), type: ColumnType.ACTIVITIES, sortable: false, minWidth: 120 },
				{ title: translate('status'), type: ColumnType.STATUS, sortBy: 'status.step', minWidth: 120 },
			];
		}

		this.linkColumns();
	}

	ngOnChanges() {
		console.log('rows::', this.rows);
	}

	hasOpenRequest(id) {
		this.requestElementService
			.queryCount(`targetId == "${id}" AND targetedEntityType == "Product" && (reply.status == "replied")`)
			.subscribe(d => {
				console.log('TCL: ProductsPageComponent -> ngOnInit -> d', d);
			});
	}

	hasTasksOverdue(id) {
		const foundElem = (this.rows as any[]).find(o => o.id === id);

		if (foundElem
			&& foundElem.tasksLinked.count
			&& (foundElem.tasksLinked.items.filter(t => this.isTaskOverdued(t)).length > 0)) {
			return true;
		}

		return false;
	}

	isTaskOverdued(task: Task): boolean {
		return task && task.dueDate && new Date().getTime() >= Date.parse(task.dueDate.toString());
	}

	// should be fixed
	getProductOpenRequests(product: Product): Observable<number> {
		// TODO
		return of(1); // just a value for testing
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
			case 'createdBy':
				column.template = this.createdByTemplate;
				break;
			case 'rating':
				column.template = this.ratingTemplate;
				break;
			case 'user':
				column.template = this.userTemplate;
				break;
			case 'activities':
				column.template = this.activitiesTemplate;
				break;
			default:
				column.template = this.defaultTemplate;
		}
	}
}
