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
import { ProductService, TaskService } from '~entity-services';
import { Comment, Product, Task } from '~models';
import { DialogService } from '~shared/dialog/services';
import { CustomField } from '~shared/dynamic-forms';
import { SelectorEntityComponent } from '~shared/selectors/components/selector-entity/selector-entity.component';
import { AutoUnsub } from '~utils';


@Component({
	selector: 'preview-task-app',
	templateUrl: './preview-task.component.html',
	styleUrls: ['./preview-task.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewTaskComponent extends AutoUnsub implements OnInit, AfterViewChecked {

	@Input() set task(value: Task) {
		this._task = value;
	}
	@ViewChild(SelectorEntityComponent) selector: SelectorEntityComponent;

	task$: Observable<Task>;
	private _task: Task;
	erm = ERM;
	menuOpen = false;

	constructor(
		private taskSrv: TaskService,
		private productService: ProductService) {
		super();
	}

	ngOnInit() {
		this.task$ = this.taskSrv.selectOne(this._task.id);
	}

	ngAfterViewChecked() {
		if (this.menuOpen && this.selector) {
			this.selector.open();
			this.selector.selector.ngSelect.updateDropdownPosition();
		}
	}

	update(value: any, prop: string) {

		this.taskSrv.update({ id: this._task.id, [prop]: value }).subscribe();
	}

	updateDueDate(isCancel: boolean, value: Date) {
		if (!isCancel && isCancel !== undefined) this.update(value, 'dueDate');
	}

	closeMenu() {
		this.menuOpen = false;
	}



	/** OLD */
	@Output() udateTask = new EventEmitter<Task>();

	@Output() close = new EventEmitter<any>();

	comment$: Observable<Comment>;

	updateTaskServer(task: any, field?: string) {
		task.id = this._task.id;
		this.taskSrv.update(task).subscribe();
	}

	updateTaskDescription(isCancel: boolean, description: string) {
		if (isCancel) return;

		this.updateTaskServer({ description }, 'description');
	}

	markAsDone() {
		this.updateTaskServer({ done: true }, 'done');
	}

	updateTaskName(isCancel: boolean, name: string) {
		if (isCancel) return;

		this.updateTaskServer({ name }, 'name');
	}

	updateTaskDueDate(isCancel: boolean, dueDate: Date) {
		if (isCancel) return;

		this.updateTaskServer({ dueDate }, 'dueDate');
	}

	updateAssignee(assignee: any) {
		this.updateTaskServer({ assignee });
		setTimeout(() => {
			this.menuOpen = false;
		});
	}

	toggleSelector(is: boolean) {
		if (this.selector) {
			this.menuOpen = false;
		} else this.menuOpen = is;
	}

	onFormCreated(form: FormGroup) {
		form.valueChanges
			.pipe(
				takeUntil(this._destroy$),
				distinctUntilChanged()
			).subscribe(task => this.updateTaskServer(task));
	}
}
