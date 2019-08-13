import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ProductService, SupplierService, TaskService, SampleService } from '~core/entity-services';
import { Router } from '@angular/router';
import { Product } from '~models';
import { Observable } from 'apollo-link';

@Component({
	selector: 'notif-item-app',
	templateUrl: './notif-item.component.html',
	styleUrls: ['./notif-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotifItemComponent implements OnInit {

	@Input() activity: any = null;
	@Output() close = new EventEmitter<void>();

	activityMessage: string;
	navigateRout: string;
	badgeType: string;
	targetId: string;
	target$: any;
	constructor(
		private router: Router,
		private productSrv: ProductService,
		private supplierSrv: SupplierService,
		private taskSrv: TaskService,
		private sampleSrv: SampleService,
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

	detail() {
		console.log('item', this.activity);
		this.close.emit();
		const { target_id } = this.activity.activities[0];

		this.router.navigate([this.navigateRout]);
	}

	ngOnInit() {
		const { verb } = this.activity;
		this.initialSetup();
	}

	initialSetup() {
		const { verb } = this.activity;
		const [firstActivity] = this.activity.activities;
		const { target } = firstActivity;
		switch (verb) {
			case 'create_comment':
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
				this.activityMessage = 'assign you a task';
				this.targetId = firstActivity.object;
				this.target$ = this.getTask();
				this.navigateRout = `/workspace/my-tasks`;
				break;
			case 'task_complete':
				this.activityMessage = 'has completed your task';
				this.targetId = firstActivity.object;
				this.target$ = this.getTask();
				this.navigateRout = `/workspace/my-tasks`;
				break;
			case 'create_vote':
				this.activityMessage = 'like / disliked you product';
				this.targetId = firstActivity.target_id;
				this.navigateRout = `/product/${this.targetId}/activity`;
				this.target$ = this.getProduct();
				break;
			case 'new_assignee':
				this.activityMessage = `assigned you a ${target}`;
				this.targetId = firstActivity.object;
				if (target === 'sample') {
					this.target$ = this.getSample();
					this.navigateRout = '/workspace/my-samples/list';
				} else if (target === 'product') {
					this.target$ = this.getProduct();
					this.navigateRout = `/product/${this.targetId}/activity`;
				} else {
					this.target$ = this.getSupplier();
					this.navigateRout = `/supplier/${this.targetId}/activity`;
				}
				break;
			case 'new_task_assignee' :
					this.activityMessage = 'assign you a task';
					this.targetId = firstActivity.object;
					this.target$ = this.getTask();
					this.navigateRout = `/workspace/my-tasks`;
					break;
		}
	}

}
