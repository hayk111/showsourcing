import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { RequestElementService, TaskService, SampleService } from '~core/entity-services';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { Observable } from 'rxjs';
import { ReplyStatus, Task, EntityName } from '~core/models';

@Component({
	selector: 'activities-bar-app',
	templateUrl: './activities-bar.component.html',
	styleUrls: ['./activities-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitiesBarComponent implements OnInit {
	@Input() row: any;
	@Input() entityName: EntityName.PRODUCT | EntityName.SUPPLIER = EntityName.PRODUCT;
	@Input() favourite = false;
	@Input() hasSamples = false;
	@Input() hasTasks = false;
	@Input() hasComments = false;
	@Input() votes: any[];

	hasTaskOverdue: boolean;

	openRequestsCount$: Observable<number>;
	requestsCount$: Observable<number>;
	tasksCount$: Observable<number>;
	samplesCount$: Observable<number>;

	constructor(
		private requestElementService: RequestElementService,
		private taskSrv: TaskService,
		private sampleSrv: SampleService,
		public thumbService: ThumbService,
	) { }

	ngOnInit() {
		if (this.row && this.row.id) {
			this.openRequestsCount$ = this.requestElementService
				.queryCount(`targetId == "${this.row.id}" AND targetedEntityType == "Product" AND (reply.status == "${ReplyStatus.REPLIED}")`);

			this.requestsCount$ = this.requestElementService
				.queryCount(`targetId == "${this.row.id}" AND targetedEntityType == "Product"`);

			if (this.hasTasks) {
				this.tasksCount$ = this.taskSrv
					.queryCount(`${this.entityName}.id == "${this.row.id}" AND deleted == false AND archived == false`);
			}

			if (this.hasSamples) {
				this.samplesCount$ = this.sampleSrv
					.queryCount(`${this.entityName}.id == "${this.row.id}" AND deleted == false AND archived == false`);
			}
			this.hasTaskOverdue = this.hasTasksOverdue(this.row.id);
		}
	}

	hasTasksOverdue(id) {
		if (!id) {
			return false;
		}

		if (this.row
			&& this.row.tasksLinked
			&& this.row.tasksLinked.count
			&& (this.row.tasksLinked.items.some(task => this.isTaskOverdued(task)).length > 0)) {
			return true;
		}

		return false;
	}

	isTaskOverdued(task: Task): boolean {
		return task && task.dueDate && new Date().getTime() >= Date.parse(task.dueDate.toString());
	}
}
