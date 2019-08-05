import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { CommentService } from '~core/entity-services/comment/comment.service';
import { TaskService } from '~entity-services';
import { Comment, ERM, Task, ExtendedFieldDefinition } from '~models';
import { DynamicField } from '~shared/dynamic-forms';
import { AutoUnsub, translate } from '~utils';
import {
	ExtendedFieldDefinitionService,
} from '~core/entity-services/extended-field-definition/extended-field-definition.service';

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

	task$: Observable<Task>;
	erm = ERM;

	fieldDefinitions$: Observable<ExtendedFieldDefinition[]>;
	dynamicFields: DynamicField[] = [
		{
			name: 'createdBy',
			type: 'selector',
			label: translate('created by'),
			metadata: { target: ERM.USER.singular, type: 'entity', disabled: true }
		},
		{
			name: 'creationDate',
			type: 'date',
			label: translate('creation date'),
			metadata: { disabled: true }
		},
		{
			name: 'lastUpdatedBy',
			type: 'selector',
			label: translate('last updated by'),
			metadata: { target: ERM.USER.singular, type: 'entity', disabled: true }
		},
		{
			name: 'lastUpdatedDate',
			type: 'date',
			label: translate('last updated date'),
			metadata: { disabled: true }
		}
	];

	constructor(
		private commentSrv: CommentService,
		private router: Router,
		private taskSrv: TaskService,
		private extendedFieldDefSrv: ExtendedFieldDefinitionService
	) {
		super();
	}

	ngOnInit() {
		this.fieldDefinitions$ = this.extendedFieldDefSrv.queryMany({ query: 'target == "task.extendedFields"' });
	}

	ngOnChanges() {
		this.task$ = this.taskSrv.selectOne(this._task.id);
		this.task$.pipe(takeUntil(this._destroy$))
			.subscribe(s => this._task = s);
	}

	updateTask(taskConfig: any) {
		const task = ({ ...taskConfig, id: this.task.id });
		this.taskSrv.update(task).subscribe();
	}

	update(value: any, prop: string) {
		this.updateTask({ [prop]: value });
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

	openSupplier() {
		this.router.navigate(['supplier', this.task.supplier.id]);
	}

	openProduct() {
		this.router.navigate(['product', this.task.product.id]);
	}
}
