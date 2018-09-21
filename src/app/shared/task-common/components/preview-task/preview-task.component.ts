import {
	AfterViewChecked,
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	NgModuleRef,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ProductService, TaskService } from '~global-services';
import { Comment, Product, Task } from '~models';
import { DialogService } from '~shared/dialog';
import { CustomField, FormDescriptor } from '~shared/dynamic-forms';
import { SelectorEntityComponent } from '~shared/selectors/components/selector-entity/selector-entity.component';
import { AutoUnsub } from '~utils';


@Component({
	selector: 'preview-task-app',
	templateUrl: './preview-task.component.html',
	styleUrls: ['./preview-task.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewTaskComponent extends AutoUnsub implements OnInit, AfterViewChecked {

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

	ngAfterViewChecked() {
		setTimeout(() => {
			if (this.selectorVisible && this.selector) {
				this.selector.open();
			}
		});
	}

	updateTaskServer(task: any) {
		task.id = this.task.id;
		this.featureSrv.update(task).subscribe();
	}

	updateTaskDescription(isCancel: boolean, description: string) {
		if (isCancel) return;

		this.updateTaskServer({ description });
	}

	markAsDone() {
		this.updateTaskServer({ done: true });
	}

	updateTaskName(isCancel: boolean, name: string) {
		if (isCancel) return;

		this.updateTaskServer({ name });
	}

	updateTaskDueDate(isCancel: boolean, dueDate: Date) {
		if (isCancel) return;

		this.updateTaskServer({ dueDate });
	}

	updateAssignee(assignee: any) {
		this.updateTaskServer({ assignee });
		setTimeout(() => {
			this.selectorVisible = false;
		});
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
