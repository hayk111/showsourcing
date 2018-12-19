import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ERM, Task } from '~models';
import { InputDirective } from '~shared/inputs';
import { TrackingComponent } from '~utils/tracking-component';
import { FilterList, FilterType } from '~shared/filters';

@Component({
	selector: 'task-list-app',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent extends TrackingComponent implements OnInit {

	@Input() selection: Map<string, Task>;
	@Input() tasks: Task[];
	@Input() fullUser = false;
	@Input() hasSupplier = false;
	@Input() hasProduct = false;
	@Input() hasFilters = true;
	@Input() filterList: FilterList;
	@Output() toggleMyTasks = new EventEmitter<boolean>();
	@Output() createTask = new EventEmitter<string>();
	@Output() bottomReached = new EventEmitter<null>();
	@Output() previewClicked = new EventEmitter<Task>();
	@Output() taskSelect = new EventEmitter<Task>();
	@Output() taskUnselect = new EventEmitter<Task>();
	@Output() updateTask = new EventEmitter<Task>();

	@ViewChild(InputDirective) inp: InputDirective;
	taskCtrl = new FormControl('');
	hoverIndex: number;
	filterTypeEnum = FilterType;

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
