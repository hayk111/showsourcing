import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { GetStreamActivity } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { Product, Supplier, EntityMetadata, User } from '~models';
import { InputDirective } from '~shared/inputs';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from '~entity-services';
import { AutoUnsub } from '~utils';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'product-card-app',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent extends AutoUnsub implements OnInit {

	@Input() activity: GetStreamActivity;
	@Input() entity: Product | Supplier;
	@Input() typeEntity: EntityMetadata;
	@Output() createComment = new EventEmitter<any>();
	@ViewChild(InputDirective) inp: InputDirective;

	actor$: Observable<User>;
	actor: User;
	commentCtrl = new FormControl('');

	constructor(private userSrv: UserService) { super(); }

	ngOnInit() {
		this.actor$ = this.userSrv.queryOne(this.activity.actor);
	}

	get title() {
		let title = '';
		switch (this.activity.verb) {
			// Product
			case 'create_comment':
				title = 'has commented';
				break;
			case 'create_product':
				title = 'created the product';
				break;
			case 'vote_product':
				title = 'has voted';
				break;
			case 'update_product':
				title = 'updated the product';
				break;
			// Supplier
			case 'create_supplier':
				title = 'created the supplier';
				break;
			case 'update_supplier':
				title = 'updated the supplier';
				break;
			default:
				title = 'has made an update';
				break;
		}
		return title;
	}

	onEnter(event) {
		event.preventDefault();
		this.onSubmit();
	}

	onSubmit() {
		this.createComment.emit({ text: this.commentCtrl.value, product: this.entity });
		this.commentCtrl.reset();
	}

}

/*
Using in :
- flat-feed-list

*/
