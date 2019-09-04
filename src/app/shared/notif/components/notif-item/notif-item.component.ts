import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ProductService, SupplierService, TaskService, SampleService } from '~core/entity-services';
import { GetStreamGroup, GetStreamActivity } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { NotificationActivityService } from '~shared/notif/services/notification-activity.service';

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
	constructor(
		private productSrv: ProductService,
		private supplierSrv: SupplierService,
		private taskSrv: TaskService,
		private sampleSrv: SampleService,
		private notifActivitySrv: NotificationActivityService,
	) {
	}

	ngOnInit() {
		this.initialSetup();
	}

	initialSetup() {
		const { verb } = this.activity;
		const [firstActivity] = this.activity.activities;
		this.firstActivity = firstActivity;
		const { target } = firstActivity;
		switch (verb) {
			case 'create_comment':
				this.badgeType = 'comment';
				this.activityMessage = `has commented on the ${target}`;
				this.targetId = firstActivity.target_id;
				if (target.toLowerCase() === 'product') {
					this.navigateRoute = `/product/${this.targetId}/activity`;
				} else {
					this.navigateRoute = `/supplier/${this.targetId}/activity`;
				}
				break;
			case 'create_task':
				this.badgeType = 'task';
				this.badgeColor = 'secondary';
				this.activityMessage = 'assign you a task';
				this.targetId = firstActivity.object;
				this.navigateRoute = `/workspace/my-tasks`;
				break;
			case 'task_complete':
				this.badgeType = 'task';
				this.activityMessage = 'has completed your task';
				this.targetId = firstActivity.object;
				this.navigateRoute = `/workspace/my-tasks`;
				break;
			case 'create_vote':
				this.badgeType = 'product';
				this.activityMessage = 'rated your product';
				this.targetId = firstActivity.target_id;
				this.navigateRoute = `/product/${this.targetId}/activity`;
				break;
			case 'new_assignee':
				this.activityMessage = `assigned you a ${target}`;
				this.targetId = firstActivity.object;
				if (target === 'sample') {
					this.badgeType = 'sample';
					this.navigateRoute = '/workspace/my-samples/list';
				} else if (target === 'product') {
					this.badgeType = 'product';
					this.navigateRoute = `/product/${this.targetId}/activity`;
				} else {
					this.badgeType = 'supplier';
					this.navigateRoute = `/supplier/${this.targetId}/activity`;
				}
				break;
			case 'new_task_assignee':
				this.badgeColor = 'secondary';
				this.badgeType = 'task';
				this.activityMessage = 'assign you a task';
				this.targetId = firstActivity.object;
				this.navigateRoute = `/workspace/my-tasks`;
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

	redirect(event: MouseEvent ) {
		event.stopPropagation();
		this.notifActivitySrv.markAsRead(this.activity.id);
		this.notifActivitySrv.closeNotificationPanel();
		this.notifActivitySrv.redirect(this.navigateRoute);
	}

	get actorName() {
		return this.activity.activities[0].actor_name;
	}

	get multipleActorMessage(): string {
		const { actor_count } = this.activity;
		if (actor_count === 2) {
			return 'and 1 other';
		}
		if (actor_count > 2) {
			return `and ${this.activity.actor_count - 1} others`;
		}
		return '';
	}

}
