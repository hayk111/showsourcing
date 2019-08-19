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

	@Input() rows: any[];
	@Input() id?: string;
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
			.queryCount(`targetId == "${this.id}" AND targetedEntityType == "Product" AND (reply.status != "${ReplyStatus.CANCELED}")`);

		this.openReviewRequestsCount$ = this.requestElementService
			.queryCount(`targetId == "${this.id}" AND targetedEntityType == "Product" AND (reply.status == "${ReplyStatus.REPLIED}")`);

		this.hasTaskOverdue = this.hasTasksOverdue(this.id);
	}

	hasTasksOverdue(id) {
		const foundElem = (this.rows as any[]).find(o => o.id === id);

		if (foundElem
			&& foundElem.tasksLinked.count
			&& (foundElem.tasksLinked.items.filter(t => this.isTaskOverdued(t)).length > 0)) {
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

		const votesVals = votes.map(v => v.value);
		const sum = votesVals.reduce((a, b) => a + b, 0);
		return Math.round( sum / votes.length * 10 ) / 10;
	}
}
