import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TaskService } from '~entity-services';
import { ERM, Task } from '~models';
import { AutoUnsub } from '~utils';


@Component({
	selector: 'task-preview-app',
	templateUrl: './task-preview.component.html',
	styleUrls: ['./task-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskPreviewComponent extends AutoUnsub implements OnInit {

	@Input() set task(value: Task) {
		this._task = value;
	}
	@Output() close = new EventEmitter<null>();

	task$: Observable<Task>;
	private _task: Task;
	erm = ERM;

	constructor(
		private taskSrv: TaskService) {
		super();
	}

	ngOnInit() {
		this.task$ = this.taskSrv.queryOne(this._task.id);
		this.task$.pipe(takeUntil(this._destroy$))
			.subscribe(s => this._task = s);
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
}