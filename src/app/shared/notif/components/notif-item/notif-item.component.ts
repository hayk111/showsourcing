import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ProductService, SupplierService, TaskService, SampleService } from '~core/erm';
import { GetStreamGroup, GetStreamActivity } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { NotificationActivityService } from '~shared/notif/services/notification-activity.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
	selector: 'notif-item-app',
	templateUrl: './notif-item.component.html',
	styleUrls: ['./notif-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotifItemComponent implements OnInit {

	@Input() activity: GetStreamGroup = null;
	@Input() isRead: boolean;

	firstActivity: GetStreamActivity;
	activityMessage: string;
	navigateRoute: string;
	badgeType: string;
	badgeColor: string;
	targetId: string;
	targetName: string;
	commentId: string;

	constructor(
		private notifActivitySrv: NotificationActivityService,
		public translate: TranslateService,
		private router: Router,
	) { }

	ngOnInit() {
		this.initialSetup();
	}

	initialSetup() {
		const { verb, group } = this.activity;
		const [firstActivity] = this.activity.activities;
		this.firstActivity = firstActivity;
		const { target } = firstActivity;
		this.targetName = target;
		switch (verb) {
			case 'create_comment':
				this.badgeType = 'comment';
				this.commentId = this.getCommentIdShort(group);
				this.activityMessage = this.actor_count > 1 ? 'OBJ.comment-on-target.plural' : 'OBJ.comment-on-target.singular';
				this.targetId = firstActivity.target_id;
				this.navigateRoute = `/${target}s/${this.targetId}/activity`;
				break;
			case 'create_task':
				this.badgeType = 'task';
				this.badgeColor = 'secondary';
				this.activityMessage = 'message.assign-you-a-task';
				this.targetId = firstActivity.object;
				this.navigateRoute = `/tasks`;
				break;
			case 'task_complete':
				this.badgeType = 'task';
				this.activityMessage = 'message.has-completed-your-task';
				this.targetId = firstActivity.object;
				this.navigateRoute = `/tasks`;
				break;
			case 'create_vote':
				this.badgeType = 'product';
				this.activityMessage = 'message.rated-your-product';
				this.targetId = firstActivity.target_id;
				this.navigateRoute = `/products/${this.targetId}`;
				break;
			case 'new_assignee':
				this.activityMessage = 'OBJ.assigned-target';
				this.targetId = firstActivity.object;
				if (target === 'sample') {
					this.badgeType = 'sample';
					this.navigateRoute = '/workspace/my-samples/list';
				} else if (target === 'product') {
					this.badgeType = 'product';
					this.navigateRoute = `/products/${this.targetId}`;
				} else {
					this.badgeType = 'supplier';
					this.navigateRoute = `/supplier/${this.targetId}`;
				}
				break;
			case 'new_task_assignee':
				this.badgeColor = 'secondary';
				this.badgeType = 'task';
				this.activityMessage = 'message.assign-you-a-task';
				this.targetId = firstActivity.object;
				this.navigateRoute = `/tasks`;
				break;
		}
	}

	markAsRead(event: MouseEvent) {
		this.notifActivitySrv.markAsRead(this.activity.id);
		this.stopPropagation(event);
	}

	stopPropagation(event: MouseEvent) {
		event.stopPropagation();
	}

	redirect(event: MouseEvent) {
		event.stopPropagation();
		this.notifActivitySrv.markAsRead(this.activity.id);
		this.notifActivitySrv.closeNotificationPanel();
		this.router.navigate([this.navigateRoute, this.commentId && { comment: this.commentId }]);
	}

	get actorName() {
		return this.activity.activities[0].actor_name;
	}

	get actor_count(): number {
		return this.activity.actor_count;
	}

	getCommentIdShort(group) {
		const secondLineAppearance = group.indexOf('-', group.indexOf('-') + 1);
		const secondUnderscoreAppearance = group.indexOf('-', group.indexOf('-') + 1);
		const longId = group.substr(secondLineAppearance + 1, secondUnderscoreAppearance);

		return longId.substr(0, longId.indexOf('-', longId.indexOf('-') + 1));
	}

}
