import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { RequestElementService, TaskService, SampleService } from '~core/entity-services';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { Observable } from 'rxjs';
import { ReplyStatus, Task, EntityName, ERM } from '~core/models';
import { ERMService } from '~core/entity-services/_global/erm.service';
import { map } from 'rxjs/operators';

@Component({
	selector: 'activities-bar-app',
	templateUrl: './activities-bar.component.html',
	styleUrls: ['./activities-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitiesBarComponent implements OnInit {
	@Input() row: any;
	@Input() entityName: EntityName.PRODUCT | EntityName.SUPPLIER = EntityName.PRODUCT;
	@Input() favorite = false;
	@Input() hasSamples = true;
	@Input() hasTasks = true;
	@Input() hasComments = true;
	@Input() votes: any[];

	hasTaskOverdue: boolean;

	openRequestsCount$: Observable<number>;
	requestsCount$: Observable<number>;
	tasksCount$: Observable<number>;
	samplesCount$: Observable<number>;
	commentsCount$: Observable<number>;

	constructor(private requestElementService: RequestElementService) { }

	ngOnInit() {
		if (this.row && this.row.id) {
			this.openRequestsCount$ = this.requestElementService
				.queryCount(`targetId == "${this.row.id}" AND targetedEntityType == "Product" AND (reply.status == "${ReplyStatus.REPLIED}")`);

			this.requestsCount$ = this.requestElementService
				.queryCount(`targetId == "${this.row.id}" AND targetedEntityType == "Product"`);

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
			&& (this.row.tasksLinked.items.some(task => this.isTaskOverdued(task)))) {
			return true;
		}

		return false;
	}

	isTaskOverdued(task: Task): boolean {
		return task && task.dueDate && new Date().getTime() >= Date.parse(task.dueDate.toString());
	}

	get taskCount() {
		return this.row.tasksLinkedAssignedToMe && this.row.tasksLinkedAssignedToMe.count;
	}

	get sampleCount() {
		return this.row.samplesLinkedAssignedToMe && this.row.samplesLinkedAssignedToMe.count;
	}

	get commentCount() {
		return this.row.comments && this.row.comments.length;
	}
}
