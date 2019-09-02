import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, AfterContentChecked } from '@angular/core';
import { RequestElementService } from '~core/entity-services';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { Observable } from 'rxjs';
import { ReplyStatus, Task } from '~core/models';

@Component({
	selector: 'activities-bar-app',
	templateUrl: './activities-bar.component.html',
	styleUrls: ['./activities-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitiesBarComponent implements OnInit {
	@Input() row: any;
	@Input() favourite = false;
	@Input() hasSamples = false;
	@Input() hasTasks = false;
	@Input() hasComments = false;
	@Input() votes: any[];

	hasTaskOverdue: boolean;

	openRequestsCount$: Observable<number>;
	openReviewRequestsCount$: Observable<number>;

	constructor(
		private requestElementService: RequestElementService,
		public thumbService: ThumbService,
	) { }

	ngOnInit() {
		if (this.row && this.row.id) {
			this.openRequestsCount$ = this.requestElementService
				.queryCount(`targetId == "${this.row.id}" AND targetedEntityType == "Product" AND (reply.status != "${ReplyStatus.CANCELED}")`);
			this.openReviewRequestsCount$ = this.requestElementService
				.queryCount(`targetId == "${this.row.id}" AND targetedEntityType == "Product" AND (reply.status == "${ReplyStatus.REPLIED}")`);

			this.hasTaskOverdue = this.hasTasksOverdue(this.row.id);
		}
	}

	hasTasksOverdue(id) {
		if (!id) {
			return false;
		}

		if (this.row
			&& this.row.tasksLinked.count
			&& (this.row.tasksLinked.items.filter(task => this.isTaskOverdued(task)).length > 0)) {
			return true;
		}

		return false;
	}

	isTaskOverdued(task: Task): boolean {
		return task && task.dueDate && new Date().getTime() >= Date.parse(task.dueDate.toString());
	}
}