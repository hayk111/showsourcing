import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, NgModule, AfterViewInit, ViewChild } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { FormDescriptor, CustomField } from '~shared/dynamic-forms';
import { FormGroup } from '@angular/forms';
import { AutoUnsub } from '~utils';
import { takeUntil, distinctUntilChanged, map, tap, first } from 'rxjs/operators';
import { TaskService, ProductService } from '~global-services';
import { DialogService } from '~shared/dialog';
import { RfqDialogComponent } from '~features/products/components/rfq-dialog/rfq-dialog.component';
import { Task, Comment, Product } from '~models';
import { NgModuleRef } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, switchMap } from 'rxjs/operators';
import { ProductAddToProjectDlgComponent } from '~shared/custom-dialog';
import { SelectorEntityComponent } from '~shared/selectors/components/selector-entity/selector-entity.component';


@Component({
  selector: 'preview-task-app',
  templateUrl: './preview-task.component.html',
  styleUrls: ['./preview-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewTaskComponent extends AutoUnsub implements OnInit, AfterViewInit {

  private _task: Task;
  get task(): Task {
    return this._task;
	}

	@Output() udateTask = new EventEmitter<Task>();

  @Input('task')
  set task(value: Task) {
    this._task = value;
  }

	@ViewChild(SelectorEntityComponent) selector: SelectorEntityComponent;

  @Output() close = new EventEmitter<any>();

  comment$: Observable<Comment>;
  task$: Observable<Task>;
  product$: Observable<Product>;
  descriptor$: Observable<FormDescriptor>;

  selectorVisible = false;

	customFields: CustomField[] = [
		{
			name: 'assignee', label: 'Assignee To', type: 'selector',
			metadata: { target: 'user', type: 'entity', labelName: 'name' }
		},
	];
  constructor(
    private featureSrv: TaskService,
    private productService: ProductService,
    private dlgSrv: DialogService,
    private module: NgModuleRef<any>,
    private router: Router) {
    super();
  }

  ngOnInit() {
    if (this.task.product) {
      this.product$ = this.productService.selectOne(this.task.product.id);
    }
    this.task$ = this.featureSrv.selectOne(this.task.id);
  }

  ngAfterViewInit() {
  }
  updateTaskServer(task: any) {
		task.id = this.task.id;
		this.featureSrv.update(task).subscribe();
  }

  updateTaskDescription(description: string) {
		this.updateTaskServer({ description });
  }

  markAsDone() {
		this.updateTaskServer({ done: true });
  }

  updateTaskName(name: string) {
		this.updateTaskServer({ name });
  }
  updateTaskDueDate(dueDate: Date) {
		this.updateTaskServer({ dueDate });
  }

  updateAssignee(assignee: any) {
		this.updateTaskServer({ assignee });
  }

  toggleSelector(is: boolean) {
		if (this.selector) {
			this.selectorVisible = false;
		} else this.selectorVisible = is;
  }

	onFormCreated(form: FormGroup) {
		form.valueChanges
			.pipe(
				takeUntil(this._destroy$),
				distinctUntilChanged()
			).subscribe(task => this.updateTaskServer(task));
	}
}
