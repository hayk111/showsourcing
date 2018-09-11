import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Task, Product, Supplier, ERM } from '~models';
import { Router } from '@angular/router';

@Component({
	selector: 'task-list-app',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {

	@Input() tasks: Task[];
	@Input() selection: Map<string, boolean>;
	@Input() fullUser = false;
	@Input() hasSupplier = false;
	@Input() hasProduct = false;
	@Output() taskSelect = new EventEmitter<Task>();
	@Output() taskUnselect = new EventEmitter<Task>();
	@Output() openCreateDlg = new EventEmitter<null>();
	@Output() bottomReached = new EventEmitter<null>();
	@Output() updateTask = new EventEmitter<Task>();


	hoverIndex: number;

	trackByFn = (index, item) => item.id;

	constructor(
		protected router: Router,
	) { }

	ngOnInit() {
	}

	hoverRow(index: number) {
		this.hoverIndex = index;
	}

	openProduct(id: string) {
		this.router.navigate([ERM.PRODUCT.singular, 'details', id]);
	}

	openSupplier(id: string) {
		this.router.navigate([ERM.SUPPLIER.singular, 'details', id]);
	}
}
