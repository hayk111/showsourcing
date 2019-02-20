import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { CommentService } from '~core/entity-services/comment/comment.service';
import { TaskService, UserService } from '~entity-services';
import { Comment, ERM, Task } from '~models';
import { AutoUnsub } from '~utils';


@Component({
	selector: 'task-preview-app',
	templateUrl: './task-preview.component.html',
	styleUrls: ['./task-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskPreviewComponent extends AutoUnsub implements OnChanges {

	private _task: Task;
	@Input() set task(value: Task) {
		this._task = value;
	}
	get task() {
		return this._task;
	}

	@Output() close = new EventEmitter<null>();

	task$: Observable<Task>;
	erm = ERM;

	constructor(
		private commentSrv: CommentService,
		private router: Router,
		private userSrv: UserService,
		private taskSrv: TaskService
	) {
		super();
	}

	ngOnChanges() {
		this.task$ = this.taskSrv.selectOne(this._task.id);
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
		// if we don't specify the user, when we get out of the preview and then comeback, the info displayed will be without the user info
		// const commentUser = { ...comment, createdBy: this.userSrv.userSync };
		const commentUser = { ...comment };
		const comments = [...(this._task.comments || [])];
		comments.push(commentUser);
		this.commentSrv.create(comment).pipe(
			switchMap(_ => this.taskSrv.update({ id: this._task.id, comments }))
		).subscribe();
	}

	openSupplier() {
		this.router.navigate(['supplier', 'details', this.task.supplier.id]);
	}

	openProduct() {
		this.router.navigate(['product', 'details', this.task.product.id]);
	}
}
