import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, AfterContentChecked } from '@angular/core';
import { RequestElementService } from '~core/entity-services';
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
	) { }

	ngOnInit() {
		this.openRequestsCount$ = this.requestElementService
			.queryCount(`targetId == "${this.row.id}" AND targetedEntityType == "Product" AND (reply.status != "${ReplyStatus.CANCELED}")`);

		this.openReviewRequestsCount$ = this.requestElementService
			.queryCount(`targetId == "${this.row.id}" AND targetedEntityType == "Product" AND (reply.status == "${ReplyStatus.REPLIED}")`);

		this.hasTaskOverdue = this.hasTasksOverdue(this.row.id);
	}

	hasTasksOverdue(id) {
		console.log('TCL: ActivitiesBarComponent -> hasTasksOverdue -> this.rows', this.row);
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

	getAvgVotes(votes: any[]): number {
		if (!votes || !votes.length) {
			return -1;
		}

		const votesVals = votes.map(vote => vote.value);
		const sum = votesVals.reduce((votePrev, voteNext) => votePrev + voteNext, 0);
		return Math.round( sum / votes.length * 10 ) / 10;
	}
}
