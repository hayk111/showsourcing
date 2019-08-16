import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ProductService, SupplierService, TaskService, SampleService } from '~core/entity-services';
import { Router } from '@angular/router';
import { GetStreamGroup } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { ActivityService } from '~common/activity/services/activity.service';
import { NotificationActivityService } from '~shared/notif/services/notification-activity.service';

@Component({
	selector: 'notif-item-app',
	templateUrl: './notif-item.component.html',
	styleUrls: ['./notif-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotifItemComponent implements OnInit {

	@Input() activity: GetStreamGroup = null;
	@Output() close = new EventEmitter<void>();
	activityMessage: string;
	navigateRout: string;
	badgeType: string;
	badgeColor: string;
	targetId: string;
	target$: any;
	constructor(
		private router: Router,
		private productSrv: ProductService,
		private supplierSrv: SupplierService,
		private taskSrv: TaskService,
		private sampleSrv: SampleService,
		private notifActivitySrv: NotificationActivityService,
	) {
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

	get target() {
		return this.activity.activities[0].target;
	}

	getProduct() {
		return this.productSrv.queryOne(this.targetId);
	}

	getSupplier() {
		return this.supplierSrv.queryOne(this.targetId);
	}

	getTask() {
		return this.taskSrv.queryOne(this.targetId);
	}

	getSample() {
		return this.sampleSrv.queryOne(this.targetId);
	}

	detail({target}) {
		if (target.classList.contains('primary-dot')) {
			this.activity.is_read = true;
			return this.notifActivitySrv.markAsRead(this.activity.id);
		}
		this.close.emit();
		this.router.navigate([this.navigateRout]);
	}

	ngOnInit() {
		this.initialSetup();
	}

	initialSetup() {
		const { verb } = this.activity;
		const [firstActivity] = this.activity.activities;
		const { target } = firstActivity;
		switch (verb) {
			case 'create_comment':
				this.badgeType = 'comment';
				this.activityMessage = `has commented on the ${target}`;
				this.targetId = firstActivity.target_id;
				if (target.toLowerCase() === 'product') {
					this.target$ = this.getProduct();
					this.navigateRout = `/product/${this.targetId}/activity`;
				} else {
					this.target$ = this.getSupplier();
					this.navigateRout = `/supplier/${this.targetId}/activity`;
				}
				break;
			case 'create_task':
				this.badgeType = 'task';
				this.badgeColor = 'secondary';
				this.activityMessage = 'assign you a task';
				this.targetId = firstActivity.object;
				this.target$ = this.getTask();
				this.navigateRout = `/workspace/my-tasks`;
				break;
			case 'task_complete':
				this.badgeType = 'task';
				this.activityMessage = 'has completed your task';
				this.targetId = firstActivity.object;
				this.target$ = this.getTask();
				this.navigateRout = `/workspace/my-tasks`;
				break;
			case 'create_vote':
				this.badgeType = 'product';
				this.activityMessage = 'rated your product';
				this.targetId = firstActivity.target_id;
				this.navigateRout = `/product/${this.targetId}/activity`;
				this.target$ = this.getProduct();
				break;
			case 'new_assignee':
				this.activityMessage = `assigned you a ${target}`;
				this.targetId = firstActivity.object;
				if (target === 'sample') {
					this.badgeType = 'sample';
					this.badgeColor = 'vibrant';
					this.target$ = this.getSample();
					this.navigateRout = '/workspace/my-samples/list';
				} else if (target === 'product') {
					this.badgeType = 'product';
					this.target$ = this.getProduct();
					this.navigateRout = `/product/${this.targetId}/activity`;
				} else {
					this.badgeType = 'supplier';
					this.target$ = this.getSupplier();
					this.navigateRout = `/supplier/${this.targetId}/activity`;
				}
				break;
			case 'new_task_assignee':
				this.badgeColor = 'secondary';
				this.badgeType = 'task';
				this.activityMessage = 'assign you a task';
				this.targetId = firstActivity.object;
				this.target$ = this.getTask();
				this.navigateRout = `/workspace/my-tasks`;
				break;
		}
	}

}
