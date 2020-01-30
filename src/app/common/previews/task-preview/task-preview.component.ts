import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { TaskDescriptor } from '~core/descriptors';
import { CommentService } from '~core/ORM/services/comment/comment.service';
import {
	ExtendedFieldDefinitionService,
} from '~core/ORM/services/extended-field-definition/extended-field-definition.service';
import { TaskService } from '~entity-services';
import { Comment, ERM, ExtendedFieldDefinition, Task } from '~models';
import { CloseEvent, CloseEventType, DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { DynamicFormConfig } from '~shared/dynamic-forms/models/dynamic-form-config.interface';
import { PreviewCommentComponent } from '~shared/preview';
import { AutoUnsub, StatusUtils } from '~utils';

@Component({
	selector: 'task-preview-app',
	templateUrl: './task-preview.component.html',
	styleUrls: ['./task-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskPreviewComponent extends AutoUnsub implements OnInit, OnChanges {

	private _task: Task;
	@Input() set task(value: Task) {
		this._task = value;
	}
	get task() {
		return this._task;
	}

	@Output() close = new EventEmitter<null>();

	@ViewChild(PreviewCommentComponent, { static: false }) previewComment: PreviewCommentComponent;

	task$: Observable<Task>;
	taskDescriptor: TaskDescriptor;
	formConfig = new DynamicFormConfig({ mode: 'editable-text' });
	erm = ERM;
	statusUtils = StatusUtils;

	fieldDefinitions$: Observable<ExtendedFieldDefinition[]>;

	constructor(
		private commentSrv: CommentService,
		private router: Router,
		private taskSrv: TaskService,
		private extendedFieldDefSrv: ExtendedFieldDefinitionService,
		private dlgSrv: DialogService,
		public translate: TranslateService
	) {
		super();
	}

	ngOnInit() {
		this.taskDescriptor = new TaskDescriptor([
			'createdBy', 'creationDate', 'lastUpdatedBy', 'lastUpdatedDate'
		]);

		this.fieldDefinitions$ = this.extendedFieldDefSrv.queryMany({ query: 'target == "task.extendedFields"', sortBy: 'order' });
	}

	ngOnChanges() {
		this.task$ = this.taskSrv.selectOne(this._task.id);
		this.task$.pipe(takeUntil(this._destroy$))
			.subscribe(s => this._task = s);
	}

	// UPDATES
	update(value: any, prop: string) {
		this.updateTask({ [prop]: value });
	}

	updateTask(taskConfig: any) {
		const task = ({ ...taskConfig, id: this.task.id });
		this.taskSrv.update(task).subscribe();
	}

	updateDueDate(isCancel: boolean, value: Date) {
		if (!isCancel && isCancel !== undefined)
			this.update(value, 'dueDate');
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

	delete(task: Task) {
		const text = `Are you sure you want to delete this task ?`;
		this.dlgSrv.open(ConfirmDialogComponent, { text })
			.pipe(
				filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
				switchMap(_ => this.taskSrv.delete(task.id)),
				tap(task => {
					this.close.emit();
				})
			).subscribe();
	}

	archive() {
		const text = `Are you sure you want to archive this task ?`;
		const action = 'archive';
		this.dlgSrv.open(ConfirmDialogComponent, { text, action })
			.pipe(
				filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
				tap(_ => {
					this.update(true, 'archived');
					this.close.emit();
				}),
			).subscribe();
	}

	// ACTIONS
	openSupplier() {
		this.router.navigate(['suppliers', this.task.supplier.id]);
	}

	openProduct() {
		this.router.navigate(['products', this.task.product.id]);
	}

	fontColor() {
		return this.task.done || this.statusUtils.isOverdue(this.task) ? 'color-white' : '';
	}

}
