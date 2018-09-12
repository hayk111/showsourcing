import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Task, Product, Supplier, ERM } from '~models';
import { Router } from '@angular/router';
import { InputDirective } from '~shared/inputs';
import { FormControl } from '@angular/forms';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';

@Component({
	selector: 'task-list-app',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent extends TrackingComponent implements OnInit {

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
	@Output() createTask = new EventEmitter<string>();

	@ViewChild(InputDirective) inp: InputDirective;
	taskCtrl = new FormControl('');
  hoverIndex: number;

	constructor(
		protected router: Router,
	) {
    super();
  }

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

	onEnter(event) {
		event.preventDefault();
		this.onSubmit();
	}

	onSubmit() {
		this.createTask.emit(this.taskCtrl.value);
		this.taskCtrl.reset();
	}
}
