import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { RequestElementService } from '~core/orm/services';
import { RatingService } from '~shared/rating/services/rating.service';
import { Observable } from 'rxjs';
import { ReplyStatus, Task, EntityName } from '~core/orm/models';

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
	@Input() hasRequestCount = false;
	@Input() hasSamples = true;
	@Input() hasTasks = true;
	@Input() hasComments = true;
	@Input() votes: any[];

	hasTaskOverdue: boolean;

	openRequestsCount$: Observable<number>;
	requestsCount$: Observable<number>;

	constructor(private requestElementService: RequestElementService) { }

	ngOnInit() {
		if (this.row && this.row.id) {
			if (this.hasRequestCount) {
				this.openRequestsCount$ = this.requestElementService
					.queryCount(`targetId == "${this.row.id}" AND targetedEntityType == "Product" AND (reply.status == "${ReplyStatus.REPLIED}")`);

				this.requestsCount$ = this.requestElementService
					.queryCount(`targetId == "${this.row.id}" AND targetedEntityType == "Product"`);
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
			&& (this.row.tasksLinked.items.some(task => this.isTaskOverdued(task)))) {
			return true;
		}

		return false;
	}

	isTaskOverdued(task: Task): boolean {
		return task && task.dueDate && new Date().getTime() >= Date.parse(task.dueDate.toString());
	}

	get taskCount() {
		return this.row && this.row.tasksLinked && this.row.tasksLinked.count;
	}

	get sampleCount() {
		return this.row && this.row.samplesLinked && this.row.samplesLinked.count;
	}

	get commentCount() {
		return this.row && this.row.comments && this.row.comments.length;
	}
}
