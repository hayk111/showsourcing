import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TaskDescriptor } from '~core/descriptors';
import { Comment, CommentService, ERM, ExtendedFieldDefinition, Task } from '~core/erm';
import { ListFuseHelperService } from '~core/list-page2';
import { DynamicFormConfig } from '~shared/dynamic-forms/models/dynamic-form-config.interface';
import { PreviewCommentComponent } from '~shared/preview';
import { AutoUnsub, StatusUtils } from '~utils';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';

@Component({
	selector: 'task-preview-app',
	templateUrl: './task-preview.component.html',
	styleUrls: ['./task-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPreviewComponent extends AutoUnsub implements OnInit {
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
		private listHelper: ListFuseHelperService,
		private commentSrv: CommentService,
		private router: Router,
		private dlgCommonSrv: DialogCommonService,
		public translate: TranslateService
	) {
		super();
	}

	ngOnInit() {
		this.taskDescriptor = new TaskDescriptor([
			'createdBy',
			'creationDate',
			'lastUpdatedBy',
			'lastUpdatedDate',
		]);

		// this.fieldDefinitions$ = this.extendedFieldDefSrv.queryMany({ query: 'target == "task.extendedFields"', sortBy: 'order' });
	}

	// UPDATES
	update(value: any, prop: string) {
		this.updateTask({ [prop]: value });
	}

	updateTask(taskConfig: any) {
		const task = { ...taskConfig, id: this.task.id, _version: this._task._version };
		this.listHelper.update(task);
		this._task = task;
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
		this.commentSrv
			.create(comment)
			.pipe(tap((_) => this.listHelper.update({ id: this._task.id, comments })))
			.subscribe();
	}

	delete(task: Task) {
		const text = `Are you sure you want to delete this task ?`;
		this.dlgCommonSrv
			.openConfirmDlg({ text })
			.data$.pipe(tap((_) => this.listHelper.delete(task.id)))
			.subscribe((_) => this.close.emit());
	}

	archive() {
		const text = `Are you sure you want to archive this task ?`;
		const action = 'archive';
		this.dlgCommonSrv.openConfirmDlg({ text, action }).data$.subscribe((_) => {
			this.update(true, 'archived');
			this.close.emit();
		});
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
