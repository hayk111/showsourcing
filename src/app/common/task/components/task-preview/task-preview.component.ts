import {
	AfterViewChecked,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from '~entity-services';
import { ERM, Task } from '~models';
import { SelectorEntityComponent } from '~shared/selectors/components/selector-entity/selector-entity.component';
import { AutoUnsub } from '~utils';
import { takeUntil } from 'rxjs/operators';


@Component({
	selector: 'task-preview-app',
	templateUrl: './task-preview.component.html',
	styleUrls: ['./task-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskPreviewComponent extends AutoUnsub implements OnInit, AfterViewChecked {

	@Input() set task(value: Task) {
		this._task = value;
	}
	@Output() close = new EventEmitter<null>();
	@ViewChild(SelectorEntityComponent) selector: SelectorEntityComponent;

	task$: Observable<Task>;
	private _task: Task;
	erm = ERM;
	menuOpen = false;

	constructor(
		private taskSrv: TaskService) {
		super();
	}

	ngOnInit() {
		this.task$ = this.taskSrv.selectOne(this._task.id);
		this.task$.pipe(takeUntil(this._destroy$))
			.subscribe(s => this._task = s);
	}

	ngAfterViewChecked() {
		// if (this.menuOpen && this.selector) {
		// 	this.selector.open();
		// 	this.selector.selector.ngSelect.updateDropdownPosition();
		// }
	}

	update(value: any, prop: string) {
		this.taskSrv.update({ id: this._task.id, [prop]: value }).subscribe();
	}

	updateDueDate(isCancel: boolean, value: Date) {
		if (!isCancel && isCancel !== undefined) this.update(value, 'dueDate');
	}

	addComment(comment: Comment) {
		const comments = [...(this._task.comments || [])];
		comments.push(comment as any);
		this.taskSrv.update({ id: this._task.id, comments }).subscribe();
	}

	toggleSelector(is: boolean) {
		if (this.selector) {
			this.menuOpen = false;
		} else this.menuOpen = is;
	}

	closeMenu() {
		this.menuOpen = false;
	}
}
